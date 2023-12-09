$(document).ready(function() {
  $('input[type="checkbox"]').change(function() {
    var isChecked = $(this).is(':checked');
    var associatedText = $(this).closest('div').find('.toggle-text');

    if (isChecked) {
      associatedText.css('color', '#219EBC');
    } else {
      associatedText.css('color', 'white');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const rangeInput = document.getElementById('customRange');
  const rangeValue = document.getElementById('rangeValue');

  const updateValue = () => {
    const currentValue = parseFloat(rangeInput.value);
    rangeValue.textContent = `${currentValue} PLN`;
    const handlePosition = ((currentValue - rangeInput.min) / (rangeInput.max - rangeInput.min)) * 100;
    rangeValue.style.left = `${handlePosition}%`;
  };

    rangeInput.addEventListener('mouseup', function() {
        rangeValue.style.display = 'none';
    });

  rangeInput.addEventListener('mousedown', function() {
        rangeValue.style.display = 'block';
  });

  rangeInput.addEventListener('input', function() {
    updateValue();
  });

  updateValue();
});

function rangeSlide(value) {
    document.getElementById('selectedValue').innerHTML = value + " PLN";
}
