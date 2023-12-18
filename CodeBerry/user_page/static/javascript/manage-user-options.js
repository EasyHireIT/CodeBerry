function updateEducationOptionClass(optionLabel) {
    var parentDivs = document.querySelectorAll('.select-information');
    parentDivs.forEach(function(parentDiv) {
        if (parentDiv.parentElement.className === 'education-field') {
            var options = parentDiv.querySelectorAll('.select__item');
            var lastOption = Array.from(options).find(option => option.textContent.trim() === 'Nie chcę podawać');
            optionLabel
            if (lastOption.classList.contains('select__item--selected')) {
                options.forEach(function(option) {
                    if (option !== lastOption) {
                        option.classList.remove('select__item--selected');
                    }
                });
            }else {
                lastOption.classList.remove('select__item--selected');
            }
        }
    });
}















function updateRelocationOptionClass() {
    var parentDivs = document.querySelectorAll('.select-information');
    parentDivs.forEach(function(parentDiv) {
        if (parentDiv.parentElement.className === 'employment-type-field') {
            var options = parentDiv.querySelectorAll('.select__item');
            var lastOption = Array.from(options).find(option => option.textContent.trim() === 'Stacjonarnie');

            if (lastOption && lastOption.classList.contains('select__item--selected')) {
                options.forEach(function(option) {
                    if (option !== lastOption) {
                        option.classList.remove('select__item--selected');
                    }
                });
            }
        }
    });
}