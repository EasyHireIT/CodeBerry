var isUnspecifiedOptionSelected = false;

function handleEducationFieldSelection() {
    var parentDivs = document.querySelectorAll('.select-user-education');
    parentDivs.forEach(function(parentDiv) 
    {
        if (parentDiv.parentElement.className === 'user-education-field') 
        {
            var options = parentDiv.querySelectorAll('.select__item');
            var unspecifiedOption = Array.from(options).find(option => option.textContent.trim() === 'Nie chcę podawać');
            var selectedOptions = parentDiv.querySelectorAll('.select__item--selected');
        
            if (!isUnspecifiedOptionSelected && unspecifiedOption.classList.contains('select__item--selected')) {
                options.forEach(function(option) {
                    if (option !== unspecifiedOption) {
                        option.classList.remove('select__item--selected');
                    }
                });
            }

            if(isUnspecifiedOptionSelected || !unspecifiedOption.classList.contains('select__item--selected')) {
                unspecifiedOption.classList.remove('select__item--selected');
            }
            // select unspecified as default
            if(selectedOptions.length === 0) {
                unspecifiedOption.classList.add('select__item--selected');
            }
            // check if unspecified option is selected
            if(unspecifiedOption.classList.contains('select__item--selected')) {
                isUnspecifiedOptionSelected = true;
            } else {
                isUnspecifiedOptionSelected = false;
            }
        }
    });
}

function showRelocationField() {
    var parentDivs = document.querySelectorAll('.select-user-work-model');
    parentDivs.forEach(function(parentDiv) {
        if (parentDiv.parentElement.className === 'user-work-model-field') {
            var options = parentDiv.querySelectorAll('.select__item');
            var remote = Array.from(options).find(option => option.textContent.trim() === 'Zdalnie');
            var hybrid = Array.from(options).find(option => option.textContent.trim() === 'Hybrydowo');
            var stationary = Array.from(options).find(option => option.textContent.trim() === 'Stacjonarnie');
            var relocationField = document.querySelector('.user-relocation-field');
            var relocationCitiesField = document.querySelector('.user-relocation-cities-field');
            var isRelocationFieldVisible = !document.querySelector('.user-relocation-field').classList.contains('hidden');
           
            if (!hybrid.classList.contains('select__item--selected') && !stationary.classList.contains('select__item--selected')) {
                remote.classList.add('select__item--selected');
            }

            if(isRelocationFieldVisible && (!hybrid.classList.contains('select__item--selected') || !stationary.classList.contains('select__item--selected'))) {
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
        if (parentDiv.parentElement.className === 'user-relocation-field') {
            var options = parentDiv.querySelectorAll('.select__item');
            var agreeOption = Array.from(options).find(option => option.textContent.trim() === 'Tak');
            var relocationCitiesField = document.querySelector('.user-relocation-cities-field');

            if (agreeOption.classList.contains('select__item--selected')) {
                relocationCitiesField.classList.remove('hidden');
            } else {
                relocationCitiesField.classList.add('hidden');
            }
        }
    });
}

function showSalarySliders() {
    var parentDivs = document.querySelectorAll('.select-user-work-contract');
    parentDivs.forEach(function(parentDiv) {
        if (parentDiv.parentElement.className === 'user-work-contract-field') {
            var options = parentDiv.querySelectorAll('.select__item');
            var selectedOptions = parentDiv.querySelectorAll('.select__item--selected');
            var salaryField = document.querySelector('.user-salary-field');
            // Work contract options
            var contract = Array.from(options).find(option => option.textContent.trim() === 'UoP');
            var commission = Array.from(options).find(option => option.textContent.trim() === 'UZ / UoD');
            var b2b = Array.from(options).find(option => option.textContent.trim() === 'B2B');
            // Salary sliders
            var contractSlider = document.querySelector('.salary-contract-field');
            var commissionSlider = document.querySelector('.salary-commission-field');
            var b2bSlider = document.querySelector('.salary-b2b-field');
            
            // Select contract as default option
            if(selectedOptions.length === 0){
                contract.classList.add('select__item--selected');
            }
            // Show or hide sliders
            if (contract.classList.contains('select__item--selected')) {
                salaryField.classList.remove('hidden');
                contractSlider.classList.remove('hidden');
            } else {
                contractSlider.classList.add('hidden');
            }

            if (commission.classList.contains('select__item--selected')) {
                salaryField.classList.remove('hidden');
                commissionSlider.classList.remove('hidden');
            } else {
                commissionSlider.classList.add('hidden');
            }

            if (b2b.classList.contains('select__item--selected')) {
                salaryField.classList.remove('hidden');
                b2bSlider.classList.remove('hidden');
            } else {
                b2bSlider.classList.add('hidden');
            }
            // Hide salary field if all options are not selected
            if(!contract.classList.contains('select__item--selected') && !commission.classList.contains('select__item--selected') && !b2b.classList.contains('select__item--selected')){
                salaryField.classList.add('hidden');
            }
        }
    });
}

function handleContactOptions() {
    var parentDivs = document.querySelectorAll('.select-user-contact');
    parentDivs.forEach(function(parentDiv) 
    {
        if (parentDiv.parentElement.className === 'user-contact-field') 
        {
            var options = parentDiv.querySelectorAll('.select__item');
            var selectedOptions = parentDiv.querySelectorAll('.select__item--selected');
            var chat = Array.from(options).find(option => option.textContent.trim() === 'Czat');
            // select chat option as default
            if(selectedOptions.length === 0){
                chat.classList.add('select__item--selected');
            }
        }
    });
}
