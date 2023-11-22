document.addEventListener('DOMContentLoaded', function() {
  const rangeInput = document.getElementById('customRange');
  const rangeValue = document.getElementById('rangeValue');

  const updateValue = () => {
    const currentValue = parseFloat(rangeInput.value);
    rangeValue.textContent = `${currentValue} PLN`;
    const handlePosition = ((currentValue - rangeInput.min) / (rangeInput.max - rangeInput.min)) * 100;
    rangeValue.style.left = `${handlePosition}%`;
  };

  const displayInitialValue = () => {
    rangeValue.textContent = `${parseFloat(rangeInput.value)} PLN`;
    rangeValue.style.display = 'block';
  };

  rangeInput.addEventListener('mousedown', function() {
    if (rangeValue.textContent === '') {
      displayInitialValue();
    }
  });

  rangeInput.addEventListener('input', function() {
    updateValue();
  });

  displayInitialValue();
  updateValue();
});
