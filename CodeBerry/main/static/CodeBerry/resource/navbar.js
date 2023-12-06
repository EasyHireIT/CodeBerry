// JavaScript code using vanilla JS
document.addEventListener('DOMContentLoaded', function () {
    const toggleInput = document.querySelector('.toggle-input');

    toggleInput.addEventListener('change', function () {
        if (this.checked) {
            console.log('Switch is ON');
            // Perform actions when the switch is ON
        } else {
            console.log('Switch is OFF');
            // Perform actions when the switch is OFF
        }
    });
});