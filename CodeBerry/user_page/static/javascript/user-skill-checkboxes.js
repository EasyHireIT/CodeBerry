function ToggleSkillCheckboxClass(label ,checkboxClass) {
    $(document).on("change", "input[type='checkbox']", function () {
        if ($(this).is(":checked") && $(this).parent().parent().parent().find('.sol-optiongroup-label').eq(0).text() === label) {
            $(this).parent().parent().addClass(checkboxClass);
        } else {
            $(this).parent().parent().removeClass(checkboxClass);
        }
    });
}
