var isLastOptionSelected = false;

function handleEducationFieldSelection() {
    var parentDivs = document.querySelectorAll('.select-user-education');
    parentDivs.forEach(function(parentDiv) {
        if (parentDiv.parentElement.className === 'education-field') {
            var options = parentDiv.querySelectorAll('.select__item');
            var lastOption = Array.from(options).find(option => option.textContent.trim() === 'Nie chcę podawać');
            
            if (!isLastOptionSelected && lastOption.classList.contains('select__item--selected')) {
                isLastOptionSelected = true;
                options.forEach(function(option) {
                    if (option !== lastOption) {
                        option.classList.remove('select__item--selected');
                    }
                });
            } else if (isLastOptionSelected && lastOption.classList.contains('select__item--selected')) {
                isLastOptionSelected = false;
                lastOption.classList.remove('select__item--selected');
            } else if (isLastOptionSelected && !lastOption.classList.contains('select__item--selected')) {
                isLastOptionSelected = false;
            }
            else {
                lastOption.classList.remove('select__item--selected');
            }
        }
    });
}

function showRelocationField() {
    var parentDivs = document.querySelectorAll('.select-user-work-model');
    parentDivs.forEach(function(parentDiv) {
        if (parentDiv.parentElement.className === 'work-model-field') {
            var options = parentDiv.querySelectorAll('.select__item');
            var hybrid = Array.from(options).find(option => option.textContent.trim() === 'Hybrydowo');
            var stationary = Array.from(options).find(option => option.textContent.trim() === 'Stacjonarnie');
            var relocationField = document.querySelector('.relocation-field');
            var relocationCitiesField = document.querySelector('.relocation-cities-field');
            var isRelocationFieldVisible = !document.querySelector('.relocation-field').classList.contains('hidden');
           
            if(isRelocationFieldVisible && (!hybrid.classList.contains('select__item--selected') || !stationary.classList.contains('select__item--selected'))){
                relocationCitiesField.classList.add('hidden');
            }

            if (hybrid.classList.contains('select__item--selected') || stationary.classList.contains('select__item--selected')) {
                relocationField.classList.remove('hidden');
            } else {
                relocationField.classList.add('hidden');
            }

            denyRelocationChoice(hybrid, stationary);
            showRelocationCities();
        }
    });
}

function denyRelocationChoice(hybrid, stationary) {
    var relocationParentDivs = document.querySelectorAll('.select-user-relocation');
    relocationParentDivs.forEach(function(relocationParentDiv){
        var options = relocationParentDiv.querySelectorAll('.select__item');
        var agreeOption = Array.from(options).find(option => option.textContent.trim() === 'Tak');
        var disagreeOption = Array.from(options).find(option => option.textContent.trim() === 'Nie');

        if(!hybrid.classList.contains('select__item--selected') && !stationary.classList.contains('select__item--selected')){
            agreeOption.classList.remove('select__item--selected');
            disagreeOption.classList.add('select__item--selected');
        }
    })
}

function showRelocationCities() {
    var parentDivs = document.querySelectorAll('.select-user-relocation');
    parentDivs.forEach(function(parentDiv) {
        if (parentDiv.parentElement.className === 'relocation-field') {
            var options = parentDiv.querySelectorAll('.select__item');
            var agreeOption = Array.from(options).find(option => option.textContent.trim() === 'Tak');
            var relocationCitiesField = document.querySelector('.relocation-cities-field');

            if (agreeOption && (agreeOption.classList.contains('select__item--selected'))) {
                relocationCitiesField.classList.remove('hidden');
            } else {
                relocationCitiesField.classList.add('hidden');
            }
        }
    });
}