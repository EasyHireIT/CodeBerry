/*
 * SOL - Searchable Option List jQuery plugin
 * Version 2.0.2
 * https://pbauerochse.github.io/searchable-option-list/
 *
 * Copyright 2015, Patrick Bauerochse
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 */

/*jslint nomen: true */
var maxOptionsToShow = 20;

// Initialize an array to store the hidden options
var hiddenOptions = [];

// set menu TOP postion - line 113 
(function ($, window, document) {
    'use strict';

    // constructor
    var UserSkillsMenu = function ($element, options) {
        this.$originalElement = $element;
        this.options = options;

        // allow setting options as data attribute
        // e.g. <select data-sol-options="{'allowNullSelection':true}">
        this.metadata = this.$originalElement.data('sol-options');
    };

    // plugin prototype
    UserSkillsMenu.prototype = {

        SOL_OPTION_FORMAT: {
            type:     'option',        // fixed
            value:    undefined,       // value that will be submitted
            selected: false,           // boolean selected state
            disabled: false,           // boolean disabled state
            label:    undefined,       // label string
            tooltip:  undefined,       // tooltip string
            cssClass: ''               // custom css class for container
        },
        SOL_OPTIONGROUP_FORMAT: {
            type:     'optiongroup',    // fixed
            label:    undefined,        // label string
            tooltip:  undefined,        // tooltip string
            disabled: false,            // all children disabled boolean property
            children: undefined         // array of SOL_OPTION_FORMAT objects
        },

        DATA_KEY: 'sol-element',
        WINDOW_EVENTS_KEY: 'sol-window-events',

        // default option values
        defaults: {
            data: undefined,
            name: undefined,           // name attribute, can also be set as name="" attribute on original element or data-sol-name=""

            texts: {
                noItemsAvailable: 'Nie znaleziono',
                selectNone: 'Odznacz wszystko',
                quickDelete: '&times;',
                addplaceholder: 'Dodaj...',
                searchplaceholder: 'Wyszukaj...',
                loadingData: 'Ładowanie danych...',
                itemsSelected: '{$a} zaznaczonych'
            },

            events: {
                onInitialized: undefined,
                onRendered: undefined,
                onOpen: undefined,
                onClose: undefined,
                onChange: undefined,

                onScroll: function () {                 
                    // Fixed position under the search bar
                    var selectionContainerYPos = this.$input.offset().top + this.$input.outerHeight(false);
                  
                    this.$container
                      .removeClass('sol-selection-top')
                      .addClass('sol-selection-bottom');
                  
                    // Set fixed position and width
                    this.$selectionContainer
                      .css('top', Math.floor(selectionContainerYPos));
                  }
            },

            selectAllMaxItemsThreshold: 30,
            showSelectAll: function () {
                return this.config.multiple && this.config.selectAllMaxItemsThreshold && this.items && this.items.length <= this.config.selectAllMaxItemsThreshold;
            },

            useBracketParameters: false,
            multiple: undefined,
            resultsContainer: undefined, // jquery element where the results should be appended
            closeOnClick: true, // close when user clicked 'select all' or 'deselect all'
            showSelectionBelowList: false,
            allowNullSelection: false,
            scrollTarget: undefined,
            maxHeight: undefined,
            converter: undefined,
            asyncBatchSize: 300,
            maxShow: 0
        },

        // initialize the plugin
        init: function () {
            this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);

            var originalName = this._getNameAttribute(),
                sol = this;

            if (!originalName) {
                this._showErrorLabel('name attribute is required');
                return;
            }

            // old IE does not support trim
            if (typeof String.prototype.trim !== 'function') {
                String.prototype.trim = function () {
                    return this.replace(/^\s+|\s+$/g, '');
                }
            }

            this.config.multiple = this.config.multiple || this.$originalElement.attr('multiple');

            if (!this.config.scrollTarget) {
                this.config.scrollTarget = $(window);
            }

            this._registerWindowEventsIfNeccessary();
            this._initializeUiElements();
            this._initializeInputEvents();

            setTimeout(function () {
                sol._initializeData();

                // take original form element out of form submission
                // by removing the name attribute
                sol.$originalElement
                    .data(sol.DATA_KEY, sol)
                    .removeAttr('name')
                    .data('sol-name', originalName);
            }, 0);

            this.$originalElement.hide();
            this.$container
                .css('visibility', 'initial')
                .show();

            return this;
        },

        _getNameAttribute: function () {
            return this.config.name || this.$originalElement.data('sol-name') || this.$originalElement.attr('name');
        },

        // shows an error label
        _showErrorLabel: function (message) {
            var $errorMessage = $('<div style="color: red; font-weight: bold;" />').html(message);
            if (!this.$container) {
                $errorMessage.insertAfter(this.$originalElement);
            } else {
                this.$container.append($errorMessage);
            }
        },

        // register click handler to determine when to trigger the close event
        _registerWindowEventsIfNeccessary: function () {
            if (!window[this.WINDOW_EVENTS_KEY]) {
                $(document).click(function (event) {
                    // if clicked inside a sol element close all others
                    // else close all sol containers

                    var $clickedElement = $(event.target),
                        $closestSelectionContainer = $clickedElement.closest('.sol-selection-container'),
                        $closestInnerContainer = $clickedElement.closest('.sol-inner-container'),
                        $clickedWithinThisSolContainer;

                    if ($closestInnerContainer.length) {
                        $clickedWithinThisSolContainer = $closestInnerContainer.first().parent('.sol-container');
                    } else if ($closestSelectionContainer.length) {
                        $clickedWithinThisSolContainer = $closestSelectionContainer.first().parent('.sol-container');
                    }

                    $('.sol-active')
                        .not($clickedWithinThisSolContainer)
                        .each(function (index, item) {
                            $(item)
                                .data(UserSkillsMenu.prototype.DATA_KEY)
                                .close();
                        });
                });

                // remember we already registered the global events
                window[this.WINDOW_EVENTS_KEY] = true;
            }
        },

        // add sol ui elements
        _initializeUiElements: function () {
            var self = this;

            this.internalScrollWrapper = function () {
                if ($.isFunction(self.config.events.onScroll)) {
                    self.config.events.onScroll.call(self);
                }
            };

            this.$input = $('<input type="text"/>')
                .attr('placeholder', this.config.texts.addplaceholder);

            this.$noResultsItem = $('<div class="sol-no-results"/>').html(this.config.texts.noItemsAvailable).hide();
            this.$loadingData = $('<div class="sol-loading-data"/>').html(this.config.texts.loadingData);
            this.$xItemsSelected = $('<div class="sol-results-count"/>');

            var $inputContainer = $('<div class="sol-input-container"/>').append(this.$input);
            this.$innerContainer = $('<div class="sol-inner-container"/>').append($inputContainer);
            this.$selection = $('<div class="sol-selection"/>');
            this.$selectionContainer = $('<div class="sol-selection-container"/>')
                .append(this.$noResultsItem)
                .append(this.$loadingData)
                .append(this.$selection);

            this.$container = $('<div class="sol-container"/>')
                .hide()
                .data(this.DATA_KEY, this)
                .append(this.$selectionContainer)
                .append(this.$innerContainer)
                .insertBefore(this.$originalElement);

            // add selected items display container
            this.$showSelectionContainer = $('<div class="sol-current-selection"/>');

            var $el = this.config.resultsContainer || this.$innerContainer
            if (this.config.resultsContainer) {
                this.$showSelectionContainer.appendTo($el)
            } else {
                if (this.config.showSelectionBelowList) {
                    this.$showSelectionContainer.insertAfter($el);
                } else {
                    this.$showSelectionContainer.insertBefore($el);
                }
            }

            // dimensions
            if (this.config.maxHeight) {
                this.$selection.css('max-height', this.config.maxHeight);
            }

            // detect inline css classes and styles
            var cssClassesAsString = this.$originalElement.attr('class'),
                cssStylesAsString = this.$originalElement.attr('style'),
                cssClassList = [],
                stylesList = [];

            if (cssClassesAsString && cssClassesAsString.length > 0) {
                cssClassList = cssClassesAsString.split(/\s+/);

                // apply css classes to $container
                for (var i = 0; i < cssClassList.length; i++) {
                    this.$container.addClass(cssClassList[i]);
                }
            }

            if (cssStylesAsString && cssStylesAsString.length > 0) {
                stylesList = cssStylesAsString.split(/\;/);

                // apply css inline styles to $container
                for (var i = 0; i < stylesList.length; i++) {
                    var splitted = stylesList[i].split(/\s*\:\s*/g);

                    if (splitted.length === 2) {

                        if (splitted[0].toLowerCase().indexOf('height') >= 0) {
                            // height property, apply to innerContainer instead of outer
                            this.$innerContainer.css(splitted[0].trim(), splitted[1].trim());
                        } else {
                            this.$container.css(splitted[0].trim(), splitted[1].trim());
                        }
                    }
                }
            }

            if (this.$originalElement.css('display') !== 'block') {
                this.$container.css('width', this._getActualCssPropertyValue(this.$originalElement, 'width'));
            }

            if ($.isFunction(this.config.events.onRendered)) {
                this.config.events.onRendered.call(this, this);
            }
        },

        _getActualCssPropertyValue: function ($element, property) {

            var domElement = $element.get(0),
                originalDisplayProperty = $element.css('display');

            // set invisible to get original width setting instead of translated to px
            // see https://bugzilla.mozilla.org/show_bug.cgi?id=707691#c7
            $element.css('display', 'none');

            if (domElement.currentStyle) {
                return domElement.currentStyle[property];
            } else if (window.getComputedStyle) {
                return document.defaultView.getComputedStyle(domElement, null).getPropertyValue(property);
            }

            $element.css('display', originalDisplayProperty);

            return $element.css(property);
        },

        _initializeInputEvents: function () {
            // form event
            var self = this,
                $form = this.$input.parents('form').first();

            if ($form && $form.length === 1 && !$form.data(this.WINDOW_EVENTS_KEY)) {
                var resetFunction = function () {
                    var $changedItems = [];

                    $form.find('.sol-option input').each(function (index, item) {
                        var $item = $(item),
                            initialState = $item.data('sol-item').selected;

                        if ($item.prop('checked') !== initialState) {
                            $item
                                .prop('checked', initialState)
                                .trigger('sol-change', true);
                            $changedItems.push($item);
                        }
                    });

                    if ($changedItems.length > 0 && $.isFunction(self.config.events.onChange)) {
                        self.config.events.onChange.call(self, self, $changedItems);
                    }
                };

                $form.on('reset', function (event) {
                    // unfortunately the reset event gets fired _before_
                    // the inputs are actually reset. The only possibility
                    // to overcome this is to set an interval to execute
                    // own scripts some time after the actual reset event

                    // before fields are actually reset by the browser
                    // needed to reset newly checked fields
                    resetFunction.call(self);

                    // timeout for selection after form reset
                    // needed to reset previously checked fields
                    setTimeout(function () {
                        resetFunction.call(self);
                    }, 100);
                });

                $form.data(this.WINDOW_EVENTS_KEY, true);
            }

            // text input events
            this.$input
                .focus(function () {
                    self.open();
                })
                .on('propertychange input', function (e) {
                    var valueChanged = true;
                    if (e.type=='propertychange') {
                        valueChanged = e.originalEvent.propertyName.toLowerCase()=='value';
                    }
                    if (valueChanged) {
                        self._applySearchTermFilter();
                    }
                });

            // keyboard navigation
            this.$container
                .on('keydown', function (e) {
                    var keyCode = e.keyCode;

                    // event handling for keyboard navigation
                    // only when there are results to be shown
                    if (!self.$noResultsItem.is(':visible')) {

                        var $currentHighlightedOption,
                            $nextHighlightedOption,
                            directionValue,
                            preventDefault = false,
                            $allVisibleOptions = self.$selection.find('.sol-option:visible');

                        if (keyCode === 40 || keyCode === 38) {
                            // arrow up or down to select an item
                            self._setKeyBoardNavigationMode(true);

                            $currentHighlightedOption = self.$selection.find('.sol-option.keyboard-selection');
                            directionValue = (keyCode === 38) ? -1 : 1;   // negative for up, positive for down

                            var indexOfNextHighlightedOption = $allVisibleOptions.index($currentHighlightedOption) + directionValue;
                            if (indexOfNextHighlightedOption < 0) {
                                indexOfNextHighlightedOption = $allVisibleOptions.length - 1;
                            } else if (indexOfNextHighlightedOption >= $allVisibleOptions.length) {
                                indexOfNextHighlightedOption = 0;
                            }

                            $currentHighlightedOption.removeClass('keyboard-selection');
                            $nextHighlightedOption = $($allVisibleOptions[indexOfNextHighlightedOption])
                                .addClass('keyboard-selection');

                            self.$selection.scrollTop(self.$selection.scrollTop() + $nextHighlightedOption.position().top);

                            preventDefault = true;
                        } else if (self.keyboardNavigationMode === true && keyCode === 32) {
                            // toggle current selected item with space bar
                            $currentHighlightedOption = self.$selection.find('.sol-option.keyboard-selection input');
                            $currentHighlightedOption
                                .prop('checked', !$currentHighlightedOption.prop('checked'))
                                .trigger('change');

                            preventDefault = true;
                        }

                        if (preventDefault) {
                            // dont trigger any events in the input
                            e.preventDefault();
                            return false;
                        }
                    }
                })
                .on('keyup', function (e) {
                    var keyCode = e.keyCode;

                    if (keyCode === 27) {
                        // escape key
                        if (self.keyboardNavigationMode === true) {
                            self._setKeyBoardNavigationMode(false);
                        } else if (self.$input.val() === '') {
                            // trigger closing of container
                            self.$input.trigger('blur');
                        } else {
                            // reset input and result filter
                            self.$input.val('').trigger('input');
                        }
                    } else if (keyCode === 16 || keyCode === 17 || keyCode === 18 || keyCode === 20) {
                        // special events like shift and control
                        return;
                    }
                });
        },

        _setKeyBoardNavigationMode: function (keyboardNavigationOn) {

            if (keyboardNavigationOn) {
                // on
                this.keyboardNavigationMode = true;
                this.$selection.addClass('sol-keyboard-navigation');
            } else {
                // off
                this.keyboardNavigationMode = false;
                this.$selection.find('.sol-option.keyboard-selection')
                this.$selection.removeClass('sol-keyboard-navigation');
                this.$selectionContainer.find('.sol-option.keyboard-selection').removeClass('keyboard-selection');
                this.$selection.scrollTop(0);
            }
        },

        // Function for finding options in the menu. It removed hidden-option class to make option visible
        _applySearchTermFilter: function () {
            if (!this.items || this.items.length === 0) {
                return;
            }

            // Store hidden options during page load
            this.$selectionContainer.find('.sol-option.hidden-option').each(function() {
                hiddenOptions.push($(this));
            });

            var searchTerm = this.$input.val(),
                lowerCased = (searchTerm || '').toLowerCase();

            // Show previously filtered elements again
            this.$selectionContainer.find('.sol-filtered-search').removeClass('sol-filtered-search');
            this.$selectionContainer.find('.sol-option.hidden-option').removeClass('hidden-option');
            this._setNoResultsItemVisible(false);

            if (lowerCased.trim().length > 0) {
                this._findTerms(this.items, lowerCased);
            }

            // Clearing the search pattern
            else {
                // Restore hidden state for previously hidden options
                for (var i = 0; i < hiddenOptions.length; i++) {
                    var $option = hiddenOptions[i];
            
                    // Check if the option has the "selected-language" class
                    if (!$option.hasClass('selected-language')) {
                        $option.addClass('hidden-option');
                    }
                }
            }
            
            // Call onScroll to position the popup again
            // Important if showing popup above the list
            if ($.isFunction(this.config.events.onScroll)) {
                this.config.events.onScroll.call(this);
            }
        },
        
        // Function related to _applySearchTermFilter. It adds sol-filtered-search class when item is found.
        _findTerms: function (dataArray, searchTerm) {
            if (!dataArray || !$.isArray(dataArray) || dataArray.length === 0) {
                return;
            }
        
            var self = this;
        
            // Reset keyboard navigation mode when applying a new filter
            this._setKeyBoardNavigationMode(false);
        
            $.each(dataArray, function (index, item) {
                if (item.type === 'option') {
                    var $element = item.displayElement,
                        elementSearchableTerms = (item.label + ' ' + item.tooltip).trim().toLowerCase();
        
                    if (elementSearchableTerms.indexOf(searchTerm) === -1) {
                        $element.addClass('sol-filtered-search');
                    } else {
                        // If the search term matches, check if it has the hidden-option class, and if it does, remove it.
                        if ($element.hasClass('hidden-option')) {
                            $element.removeClass('hidden-option');
                        }
                    }
                } else {
                    self._findTerms(item.children, searchTerm);
        
                    // Check if there are no unfiltered children and add the filtered class accordingly.
                    var amountOfUnfilteredChildren = item.displayElement.find('.sol-option:not(.sol-filtered-search)');
        
                    if (amountOfUnfilteredChildren.length === 0) {
                        item.displayElement.addClass('sol-filtered-search');
                    } else {
                        // If there are unfiltered children, check if the parent has the hidden-option class and remove it.
                        if (item.displayElement.hasClass('hidden-option')) {
                            item.displayElement.removeClass('hidden-option');
                        }
                    }
                }
            });
        
            this._setNoResultsItemVisible(this.$selectionContainer.find('.sol-option:not(.sol-filtered-search)').length === 0);
        },

        _initializeData: function () {
            if (!this.config.data) {
                this.items = this._detectDataFromOriginalElement();
            } else if ($.isFunction(this.config.data)) {
                this.items = this._fetchDataFromFunction(this.config.data);
            } else if ($.isArray(this.config.data)) {
                this.items = this._fetchDataFromArray(this.config.data);
            } else if (typeof this.config.data === (typeof 'a string')) {
                this._loadItemsFromUrl(this.config.data);
            } else {
                this._showErrorLabel('Unknown data type');
            }

            if (this.items) {
                // done right away -> invoke postprocessing
                this._processDataItems(this.items);
            }
        },

        _detectDataFromOriginalElement: function () {
            if (this.$originalElement.prop('tagName').toLowerCase() === 'select') {
                var self = this,
                    solData = [];

                $.each(this.$originalElement.children(), function (index, item) {
                    var $item = $(item),
                        itemTagName = $item.prop('tagName').toLowerCase(),
                        solDataItem;

                    if (itemTagName === 'option') {
                        solDataItem = self._processSelectOption($item);
                        if (solDataItem) {
                            solData.push(solDataItem);
                        }
                    } else if (itemTagName === 'optgroup') {
                        solDataItem = self._processSelectOptgroup($item);
                        if (solDataItem) {
                            solData.push(solDataItem);
                        }
                    } else {
                        self._showErrorLabel('Invalid element found in select: ' + itemTagName + '. Only option and optgroup are allowed');
                    }
                });
                return this._invokeConverterIfNeccessary(solData);
            } else if (this.$originalElement.data('sol-data')) {
                var solDataAttributeValue = this.$originalElement.data('sol-data');
                return this._invokeConverterIfNeccessary(solDataAttributeValue);
            } else {
                this._showErrorLabel('Could not determine data from original element. Must be a select or data must be provided as data-sol-data="" attribute');
            }
        },

        _processSelectOption: function ($option) {
            return $.extend({}, this.SOL_OPTION_FORMAT, {
                value: $option.val(),
                selected: $option.prop('selected'),
                disabled: $option.prop('disabled'),
                cssClass: $option.attr('class'),
                label: $option.html(),
                tooltip: $option.attr('title'),
                element: $option
            });
        },

        _processSelectOptgroup: function ($optgroup) {
            var self = this,
                solOptiongroup = $.extend({}, this.SOL_OPTIONGROUP_FORMAT, {
                    label: $optgroup.attr('label'),
                    tooltip: $optgroup.attr('title'),
                    disabled: $optgroup.prop('disabled'),
                    children: []
                }),
                optgroupChildren = $optgroup.children('option');

            $.each(optgroupChildren, function (index, item) {
                var $child = $(item),
                    solOption = self._processSelectOption($child);

                // explicitly disable children when optgroup is disabled
                if (solOptiongroup.disabled) {
                    solOption.disabled = true;
                }

                solOptiongroup.children.push(solOption);
            });

            return solOptiongroup;
        },

        _fetchDataFromFunction: function (dataFunction) {
            return this._invokeConverterIfNeccessary(dataFunction(this));
        },

        _fetchDataFromArray: function (dataArray) {
            return this._invokeConverterIfNeccessary(dataArray);
        },

        _loadItemsFromUrl: function (url) {
            var self = this;
            $.ajax(url, {
                success: function (actualData) {
                    self.items = self._invokeConverterIfNeccessary(actualData);
                    if (self.items) {
                        self._processDataItems(self.items);
                    }
                },
                error: function (xhr, status, message) {
                    self._showErrorLabel('Error loading from url ' + url + ': ' + message);
                },
                dataType: 'json'
            });
        },

        _invokeConverterIfNeccessary: function (dataItems) {
            if ($.isFunction(this.config.converter)) {
                return this.config.converter.call(this, this, dataItems);
            }
            return dataItems;
        },

        _processDataItems: function (solItems) {
            if (!solItems) {
                this._showErrorLabel('Data items not present. Maybe the converter did not return any values');
                return;
            }

            if (solItems.length === 0) {
                this._setNoResultsItemVisible(true);
                this.$loadingData.remove();
                return;
            }

            var self = this,
                nextIndex = 0,
                dataProcessedFunction = function () {
                    // hide "loading data"
                    this.$loadingData.remove();
                    this._initializeSelectAll();

                    if ($.isFunction(this.config.events.onInitialized)) {
                        this.config.events.onInitialized.call(this, this, solItems);
                    }
                },
                loopFunction = function () {

                    var currentBatch = 0,
                        item;

                    while (currentBatch++ < self.config.asyncBatchSize && nextIndex < solItems.length) {
                        item = solItems[nextIndex++];
                        if (item.type === self.SOL_OPTION_FORMAT.type) {
                            self._renderOption(item);
                        } else if (item.type === self.SOL_OPTIONGROUP_FORMAT.type) {
                            self._renderOptiongroup(item);
                        } else {
                            self._showErrorLabel('Invalid item type found ' + item.type);
                            return;
                        }
                    }

                    if (nextIndex >= solItems.length) {
                        dataProcessedFunction.call(self);
                    } else {
                        setTimeout(loopFunction, 0);
                    }
                };

            // start async rendering of html elements
            loopFunction.call(this);
        },

        // Function for rendering each option in the skills menu
        _renderOption: function (solOption, $optionalTargetContainer) {
            var self = this,
                $actualTargetContainer = $optionalTargetContainer || this.$selection,
                $inputElement,
                $labelText = $('<div class="sol-label-text"/>')
                    .html(solOption.label.trim().length === 0 ? '&nbsp;' : solOption.label)
                    .addClass(solOption.cssClass),
                $label,
                $displayElement,
                inputName = this._getNameAttribute();

            if (this.config.multiple) {
                $inputElement = $('<input type="checkbox" class="sol-checkbox"/>');

                if (this.config.useBracketParameters) {
                    inputName += '[]';
                }
            } else {
                $inputElement = $('<input type="radio" class="sol-radio">').on('change', function () {
                    self.$selectionContainer.find('input[type="radio"][name="' + inputName + '"]').not($(this)).trigger('sol-deselect');
                }).on('sol-deselect', function () {
                    self._removeSelectionDisplayItem($(this));
                });
            }

            // This the right place - _selectionChange for each option
            $inputElement
                .on('change', function (event, skipCallback) {
                    $(this).trigger('sol-change', skipCallback);
                })
                .on('sol-change', function (event, skipCallback) {
                    self._selectionChange($(this), skipCallback);
                })
                .data('sol-item', solOption)
                .prop('checked', solOption.selected)
                .prop('disabled', solOption.disabled)
                .attr('name', inputName)
                .val(solOption.value);

            $label = $('<label class="sol-label"/>')
                .attr('title', solOption.tooltip)
                .append($inputElement)
                .append($labelText);

            // Check if the maximum number of options to show has been reached
            if ($actualTargetContainer.find('.sol-option:not(.hidden-option)').length < maxOptionsToShow) {
                $displayElement = $('<div class="sol-option"/>').append($label);
            }
            else {
                $displayElement = $('<div class="sol-option hidden-option"/>').append($label);
            }

            solOption.displayElement = $displayElement;
            $actualTargetContainer.append($displayElement);

            if (solOption.selected) {
                this._addSelectionDisplayItem($inputElement);
            }
        },

        // Function for rendering option groups using _renderOption
        _renderOptiongroup: function (solOptiongroup) {
            var self = this,
                $groupCaption = $('<div class="sol-optiongroup-label"/>')
                    .attr('title', solOptiongroup.tooltip)
                    .html(solOptiongroup.label),
                $groupItem = $('<div class="sol-optiongroup"/>').append($groupCaption);

            if (solOptiongroup.disabled) {
                $groupItem.addClass('disabled');
            }

            if ($.isArray(solOptiongroup.children)) {
                $.each(solOptiongroup.children, function (index, item) {
                    self._renderOption(item, $groupItem);
                });
            }

            solOptiongroup.displayElement = $groupItem;
            this.$selection.append($groupItem);
        },

        _initializeSelectAll: function () {
            var self = this,
                $deselectAllButton = $('<a href="#" class="sol-deselect-all"/>').html(this.config.texts.selectNone).click(function (e) {
                    self.deselectAll();
                    e.preventDefault();
                    return false;
                });
            this.$paddingContainer = $('<div class="menu-bottom-bar"/>');
            this.$selectionContainer.append(this.$paddingContainer);
        },

        _selectionChange: function ($changeItem, skipCallback) {
            // apply state to original select if neccessary
            // helps to keep old legacy code running which depends
            // on retrieving the value via jQuery option selectors
            // e.g. $('#myPreviousSelectWhichNowIsSol').val()
            if (this.$originalElement && this.$originalElement.prop('tagName').toLowerCase() === 'select') {
                var self = this;
                this.$originalElement.find('option').each(function (index, item) {
                    var $currentOriginalOption = $(item);
                    if ($currentOriginalOption.val() === $changeItem.val()) {
                        $currentOriginalOption.prop('selected', $changeItem.prop('checked'));
                        self.$originalElement.trigger('change');
                        return;
                    }
                });
            }

            if ($changeItem.prop('checked')) {
                this._addSelectionDisplayItem($changeItem);
            } else {
                this._removeSelectionDisplayItem($changeItem);
            }

            if (this.config.multiple) {
                // update position of selection container
                // to allow selecting more entries
                this.config.scrollTarget.trigger('scroll');
            } else {
                // only one option selectable
                // close selection container
                this.close();
            }

            var selected = this.$showSelectionContainer.children('.sol-selected-display-item');
            if (this.config.maxShow != 0 && selected.length > this.config.maxShow) {
                selected.hide();
                var xitemstext = this.config.texts.itemsSelected.replace('{$a}', selected.length);
                this.$xItemsSelected.html('<div class="sol-selected-display-item-text">' + xitemstext + '<div>');
                this.$showSelectionContainer.append(this.$xItemsSelected);
                this.$xItemsSelected.show();
            } else {
                selected.show();
                this.$xItemsSelected.hide();
            }

            if (!skipCallback && $.isFunction(this.config.events.onChange)) {
                this.config.events.onChange.call(this, this, $changeItem);
            }
        },
        
        // Function responsible for rendering selected options above the search bar
        _addSelectionDisplayItem: function ($changedItem) {
            var solOptionItem = $changedItem.data('sol-item'),
                $existingDisplayItem = solOptionItem.displaySelectionItem;
        
            if (!$existingDisplayItem) {
                var $parentDiv = $('<div class="dot-selector-parent"/>'); // Create the parent div
        
                // Create the dot container and dots
                var $dotContainer = $('<div class="dot-container"/>');
                for (var i = 1; i <= 5; i++) {
                    var $dot = $(`<div class="dot dot-${solOptionItem.value}"/>`)
                        .attr('onmouseover', 'highlightDots(this)')
                        .attr('onmouseout', 'resetDots(this)')
                        .attr('onclick', 'selectDot(' + i + ')');
                    $dotContainer.append($dot);
                }
        
                $parentDiv.append($dotContainer); // Append the dot container to the parent div
        
                // Create the sol-selected-display-item
                $existingDisplayItem = $('<div class="sol-selected-display-item"/>')
                    .appendTo($parentDiv); // Append the display item to the parent div
        
                $('<label class="sol-selected-display-item-text"/>')
                    .html(solOptionItem.label)
                    .appendTo($existingDisplayItem);
        
                var $checkbox = $('<input type="checkbox" class="sol-selected-display-checkbox" />')
                    .attr('title', solOptionItem.tooltip)
                    .prop('checked', true)
                    .change(function () {
                        if (!$(this).prop('checked')) {
                            $changedItem.prop('checked', false).trigger('change');
                        }
                    })
                    .appendTo($existingDisplayItem);
        
                $existingDisplayItem.click(function () {
                    $checkbox.prop('checked', !$checkbox.prop('checked')).trigger('change');
                });
        
                // Append the parent div to sol-current-selection
                $parentDiv.appendTo(this.$showSelectionContainer);
                solOptionItem.displaySelectionItem = $existingDisplayItem;
            }
        },
        
        
        /*
        // Function responsible for rendering selected options above the search bar
        _addSelectionDisplayItem: function ($changedItem) {
            var solOptionItem = $changedItem.data('sol-item'),
                $existingDisplayItem = solOptionItem.displaySelectionItem;
        
            if (!$existingDisplayItem) {

                $existingDisplayItem = $('<div class="sol-selected-display-item"/>')
                    .appendTo(this.$showSelectionContainer);
        
                var $checkbox = $('<input type="checkbox" class="sol-selected-display-checkbox" />')
                    .attr('title', solOptionItem.tooltip)
                    .prop('checked', true)
                    .change(function () {
                        if (!$(this).prop('checked')) {
                            $changedItem.prop('checked', false).trigger('change');
                        }
                    });
        
                $('<label class="sol-selected-display-item-text" />')
                    .html(solOptionItem.label)
                    .appendTo($existingDisplayItem);
        
                $existingDisplayItem.append($checkbox);
        
                $existingDisplayItem.click(function () {
                    $checkbox.prop('checked', !$checkbox.prop('checked')).trigger('change');
                });
        
                solOptionItem.displaySelectionItem = $existingDisplayItem;
            }
        },
        */

        _removeSelectionDisplayItem: function ($changedItem) {
            var solOptionItem = $changedItem.data('sol-item'),
                $myDisplayItem = solOptionItem.displaySelectionItem;

            if ($myDisplayItem) {
                $myDisplayItem.remove();
                solOptionItem.displaySelectionItem = undefined;
            }

            RemoveOptionRemains();
        },

        _setNoResultsItemVisible: function (visible) {
            if (visible) {
                this.$noResultsItem.show();
                this.$selection.hide();

                if (this.$actionButtons) {
                    this.$actionButtons.hide();
                }
            } else {
                this.$noResultsItem.hide();
                this.$selection.show();

                if (this.$actionButtons) {
                    this.$actionButtons.show();
                }
            }
        },

        isOpen: function () {
            return this.$container.hasClass('sol-active');
        },

        isClosed: function () {
            return !this.isOpen();
        },

        toggle: function () {
            if (this.isOpen()) {
                this.close();
            } else {
                this.open();
            }
        },

        open: function () {
            if (this.isClosed()) {
                this.$container.addClass('sol-active');
                this.config.scrollTarget.bind('scroll', this.internalScrollWrapper).trigger('scroll');
                $(window).on('resize', this.internalScrollWrapper);
        
                // Update the placeholder to "Add..."
                this.$innerContainer.find('.sol-input-container input').attr('placeholder', this.config.texts.searchplaceholder);
        
                if ($.isFunction(this.config.events.onOpen)) {
                    this.config.events.onOpen.call(this, this);
                }
            }
        },
        

        close: function () {
            if (this.isOpen()) {
                this._setKeyBoardNavigationMode(false);
        
                // Update the placeholder to "Search..." when closing the menu
                this.$innerContainer.find('.sol-input-container input').attr('placeholder', this.config.texts.addplaceholder);
        
                this.$container.removeClass('sol-active');
                this.config.scrollTarget.unbind('scroll', this.internalScrollWrapper);
                $(window).off('resize');
        
                // reset search on close
                this.$input.val('');
                this._applySearchTermFilter();
        
                // clear to recalculate position again the next time sol is opened
                this.config.displayContainerAboveInput = undefined;
        
                if ($.isFunction(this.config.events.onClose)) {
                    this.config.events.onClose.call(this, this);
                }
            }
        },
        
        selectAll: function () {
            if (this.config.multiple) {
                var $changedInputs = this.$selectionContainer
                    .find('input[type="checkbox"]:not([disabled], :checked)')
                    .prop('checked', true)
                    .trigger('change', true);

                this.config.closeOnClick && this.close();

                if ($.isFunction(this.config.events.onChange)) {
                    this.config.events.onChange.call(this, this, $changedInputs);
                }
            }
        },

        invert: function() {
            if (this.config.multiple) {
                var $closedInputs = this.$selectionContainer
                    .find('input[type="checkbox"]:not([disabled], :checked)')
                var $openedInputs = this.$selectionContainer
                    .find('input[type="checkbox"]').filter('[disabled], :checked')

                $openedInputs.prop('checked', false)
                             .trigger('change', true);
                $closedInputs.prop('checked', true)
                             .trigger('change', true)

                this.options.closeOnClick && this.close();

                if ($.isFunction(this.config.events.onChange)) {
                    this.config.events.onChange.call(this, this, $openedInputs.add($closedInputs));
                }
            }
        },

        deselectAll: function () {
            if (this.config.multiple) {
                var $changedInputs = this.$selectionContainer
                    .find('input[type="checkbox"]:not([disabled]):checked')
                    .prop('checked', false)
                    .trigger('change', true);

                this.config.closeOnClick && this.close();

                if ($.isFunction(this.config.events.onChange)) {
                    this.config.events.onChange.call(this, this, $changedInputs);
                }
            }
        },

        getSelection: function () {
            return this.$selection.find('input:checked');
        }
    };

    // jquery plugin boiler plate code
    UserSkillsMenu.defaults = UserSkillsMenu.prototype.defaults;
    window.UserSkillsMenu = UserSkillsMenu;

    $.fn.UserSkillsMenu = function (options) {
        var result = [];
        this.each(function () {
            var $this = $(this),
                $alreadyInitializedSol = $this.data(UserSkillsMenu.prototype.DATA_KEY);

            if ($alreadyInitializedSol) {
                result.push($alreadyInitializedSol);
            } else {
                var newSol = new UserSkillsMenu($this, options);
                result.push(newSol);

                setTimeout(function() {
                    newSol.init();
                }, 0);
            }
        });

        if (result.length === 1) {
            return result[0];
        }

        return result;
    };

}(jQuery, window, document));



function getLabelsFromSelectedOptions() {
    const labels = document.getElementsByClassName("sol-selected-display-item-text");
    const labelList = [];
    for (let i = 0; i < labels.length; i++) {
        labelList.push(labels[i].textContent);
    }
    return labelList;
}

function modifyValueByLabel(label, newValue) {
    $(".sol-label-text").each(function() {
        if ($(this).text() === label) {
            var checkbox = $(this).parent().find("input[type='checkbox']");
            if (checkbox.is(":checked")) {
                checkbox.val(newValue);
                return false;
            }
        }
    });
}

function highlightDots(dot) {
    const dotClasses = findUniqueDotClasses();
    dotClasses.forEach(dotClass => {
        const dots = document.querySelectorAll(`.${dotClass}`);
        const index = Array.from(dots).indexOf(dot);
        for (let i = 0; i <= index; i++) {
            dots[i].classList.add('highlight');
        }
    });
}

function resetDots(dot) {
    const dotClasses = findUniqueDotClasses();
    dotClasses.forEach(dotClass => {
        const dots = document.querySelectorAll(`.${dotClass}`);
        dots.forEach(dot => dot.classList.remove('highlight'));
    });
}

function findUniqueDotClasses() {
    var elements = document.querySelectorAll('[class^="dot dot-"]');
    var uniqueClassNames = new Set();
    elements.forEach(function(element) {
        var classNames = element.className.split(' ');
        classNames.forEach(function(className) {
            if (className.startsWith('dot-')) {

                uniqueClassNames.add(className);
            }
        });
    });
    var uniqueClassNamesArray = Array.from(uniqueClassNames);
    return [...uniqueClassNames];
}

function selectDot(dotNumber) {
    var highlightedDots = [];
    var dotClasses = findUniqueDotClasses();
    var selectedOptionLabels = getLabelsFromSelectedOptions();

    for(let i = 0; i < dotClasses.length; i++){
        var dots = document.querySelectorAll(`.${dotClasses[i]}`);
        dots.forEach(dot => {
            if(dot.classList.contains('highlight')){
                highlightedDots.push(dot);
            }
        })
        // Change selected option value
        if(highlightedDots.length > 0){
            var currentOptionLabel = highlightedDots[0].parentElement.parentElement.getElementsByClassName('sol-selected-display-item-text')[0].innerText; 
            if(selectedOptionLabels[i] === currentOptionLabel){
                var currentValue = getOptionValueByLabel(currentOptionLabel);
                currentValue = currentValue.split('#')[0];
                // remove 'selected' class from dots
                currentOptionDots = document.querySelectorAll(`.dot-${currentValue}`);
                currentOptionDots.forEach(dot => {
                    dot.classList.remove('selected');
                })
                modifyValueByLabel(selectedOptionLabels[i], currentValue+`#${highlightedDots.length}`);
                highlightedDots.forEach(dot => {
                    dot.classList.add('selected');
                })
            }
        }
        highlightedDots = [];
    }
}

function getOptionValueByLabel(optionLabel){
    selectedOptionFromMenu = Array.from(document.getElementsByClassName('sol-option'));
    for (let option of selectedOptionFromMenu) {
        let label = option.getElementsByClassName('sol-label-text')[0].innerText;
        if (label === optionLabel) {
            return option.getElementsByClassName('sol-checkbox')[0].value;
        }
    }
    return null;
}

function RemoveOptionRemains(){
    var valueFromDotClass = [];
    var visibleOptionClasses = findUniqueDotClasses();
    var optionValues = [];
    var optionLabels = [];

    visibleOptionClasses.forEach(optionClass => {
        valueFromDotClass.push(optionClass.split('-')[1]);
    })

    optionLabels = getLabelsFromSelectedOptions();
    optionLabels.forEach(label => {
        optionValues.push(getOptionValueByLabel(label).split('#')[0]);
    })

    var optionToDelete = valueFromDotClass.filter(x => !optionValues.includes(x));
    var selectedOptions = Array.from(document.getElementsByClassName('dot-selector-parent'));

    selectedOptions.forEach(option => {
        if(option.childNodes[0].childNodes[0].classList.contains(`dot-${optionToDelete}`)){
            option.remove();
        }
    });
}

    // TODO:
    // - refactor
    // - removing not working when any dot selected
    // - adjust css to improve dots appearance
    // - move to separate js file
    // - check all options in menu
    // - determine if all categories need dot selector 
    // - select first dot as default exp
