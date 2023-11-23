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

