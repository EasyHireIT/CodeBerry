// 253 countries
const countries = [
    { name: "Albania", code: "AL", phone: 355 },
    { name: "Andora", code: "AD", phone: 376 },
    { name: "Austria", code: "AT", phone: 43 },
    { name: "Białoruś", code: "BY", phone: 375 },
    { name: "Belgia", code: "BE", phone: 32 },
    { name: "Bośnia i Hercegowina", code: "BA", phone: 387 },
    { name: "Bułgaria", code: "BG", phone: 359 },
    { name: "Chorwacja", code: "HR", phone: 385 },
    { name: "Cypr", code: "CY", phone: 357 },
    { name: "Czechy", code: "CZ", phone: 420 },
    { name: "Dania", code: "DK", phone: 45 },
    { name: "Estonia", code: "EE", phone: 372 },
    { name: "Finlandia", code: "FI", phone: 358 },
    { name: "Francja", code: "FR", phone: 33 },
    { name: "Niemcy", code: "DE", phone: 49 },
    { name: "Grecja", code: "GR", phone: 30 },
    { name: "Węgry", code: "HU", phone: 36 },
    { name: "Islandia", code: "IS", phone: 354 },
    { name: "Irlandia", code: "IE", phone: 353 },
    { name: "Włochy", code: "IT", phone: 39 },
    { name: "Łotwa", code: "LV", phone: 371 },
    { name: "Liechtenstein", code: "LI", phone: 423 },
    { name: "Litwa", code: "LT", phone: 370 },
    { name: "Luksemburg", code: "LU", phone: 352 },
    { name: "Malta", code: "MT", phone: 356 },
    { name: "Mołdawia", code: "MD", phone: 373 },
    { name: "Monako", code: "MC", phone: 377 },
    { name: "Czarnogóra", code: "ME", phone: 382 },
    { name: "Holandia", code: "NL", phone: 31 },
    { name: "Macedonia Północna", code: "MK", phone: 389 },
    { name: "Norwegia", code: "NO", phone: 47 },
    { name: "Polska", code: "PL", phone: 48 },
    { name: "Portugalia", code: "PT", phone: 351 },
    { name: "Rumunia", code: "RO", phone: 40 },
    { name: "Rosja", code: "RU", phone: 7 },
    { name: "San Marino", code: "SM", phone: 378 },
    { name: "Serbia", code: "RS", phone: 381 },
    { name: "Słowacja", code: "SK", phone: 421 },
    { name: "Słowenia", code: "SI", phone: 386 },
    { name: "Hiszpania", code: "ES", phone: 34 },
    { name: "Szwecja", code: "SE", phone: 46 },
    { name: "Szwajcaria", code: "CH", phone: 41 },
    { name: "Ukraina", code: "UA", phone: 380 },
    { name: "Wielka Brytania", code: "GB", phone: 44 },
    { name: "Watykan", code: "VA", phone: 379 },
]

document.addEventListener("DOMContentLoaded", function () {
    const selectBox = document.querySelector('.options'),
        searchBox = document.querySelector('.search-box'),
        inputBox = document.querySelector('input[type="tel"]'),
        selectedOption = document.querySelector('.selected-option div');

    let options = null;

    for (country of countries) {
        const option = `
        <li class="option" data-phone="+${country.phone}">
            <div>
                <span class="iconify" data-icon="flag:${country.code.toLowerCase()}-4x3"></span>
                <span class="country-name">${country.name}</span>
            </div>
        </li> `;

        selectBox.querySelector('ol').insertAdjacentHTML('beforeend', option);
        options = document.querySelectorAll('.option');
    }

    const maxDigits = 15;
    function setDefaultPhonePrefix() {
        const defaultPhoneCode = '+48';
        inputBox.value = defaultPhoneCode;
    }

    function selectOption() {
        const icon = this.querySelector('.iconify').cloneNode(true),
              phoneCode = this.getAttribute("data-phone");

        selectedOption.innerHTML = '';
        selectedOption.append(icon);

        inputBox.value = phoneCode ? phoneCode : '+48';

        selectBox.classList.remove('active');
        selectedOption.classList.remove('active');

        searchBox.value = '';
        selectBox.querySelectorAll('.hide').forEach(el => el.classList.remove('hide'));
    }

    function searchCountry() {
        let searchQuery = searchBox.value.toLowerCase();
        for (option of options) {
            let isMatched = option.querySelector('.country-name').innerText.toLowerCase().includes(searchQuery);
            option.classList.toggle('hide', !isMatched);
        }
    }

    // Set default phone prefix on page load
    setDefaultPhonePrefix();

    selectedOption.addEventListener('click', () => {
        selectBox.classList.toggle('active');
        selectedOption.classList.toggle('active');
    });

    options.forEach(option => option.addEventListener('click', selectOption));
    searchBox.addEventListener('input', searchCountry);

    // Add event listener to restrict input to numbers and allow only one '+'
    inputBox.addEventListener('input', function (event) {
        // Remove non-numeric characters and extra '+'
        this.value = this.value.replace(/\D+/g, '');

        // Allow only one '+' at the beginning
        if (!this.value.startsWith('+')) {
            this.value = '+' + this.value;
        }

        // Limit the number of digits
        if (this.value.length > maxDigits) {
            this.value = this.value.slice(0, maxDigits);
        }
    });

    // Add event listener to allow deleting '+' when clearing the input field
    inputBox.addEventListener('keydown', function (event) {
        if (event.key === 'Backspace' && this.value === '+') {
            this.value = '';
            event.preventDefault();
        }
    });
});
