function addProperClassToSelectedOptions(checkbox) {
    if (checkbox.is(":checked")) {
        const selectedLabel = checkbox.parent().find('.sol-label-text').text();
        const parentWithSelectedClass = checkbox.parents('.sol-option').filter(function () {
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

        // Call the common logic
        addProperClassToSelectedOptions($(this));
    });
}
