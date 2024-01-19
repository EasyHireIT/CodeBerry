function addProperClassToSelectedOptions(option) {
    if (option.is(":checked")) {
        const selectedLabel = option.parent().find('.sol-label-text').text();
        const parentWithSelectedClass = option.parents('.sol-option').filter(function () {
            return this.className.match(/\bselected-\S+/);
        });

        if (parentWithSelectedClass.length > 0) {
            const selectedClassName = parentWithSelectedClass[0].className.split(' ')[1];
            const matchingDisplayItem = $(".sol-selected-display-item:contains(" + selectedLabel + ")");
            matchingDisplayItem.addClass(selectedClassName);
        }
    }
}

function ToggleSkillCheckboxClass(label, checkboxClass) {
    $(document).on("change", "input[type='checkbox']", function () {
        if ($(this).is(":checked") && $(this).parent().parent().parent().find('.sol-optiongroup-label').eq(0).text() === label) {
            $(this).parent().parent().addClass(checkboxClass);
        } else {
            $(this).parent().parent().removeClass(checkboxClass);
        }

        // Change color for selected options visible above the select menu
        addProperClassToSelectedOptions($(this));
    });
}
