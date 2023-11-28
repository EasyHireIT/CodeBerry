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




// aby wartosc caly czas sie wyswietlala
//document.addEventListener('DOMContentLoaded', function() {
//  const rangeInput = document.getElementById('customRange');
//  const rangeValue = document.getElementById('rangeValue');
//
//  const updateValue = () => {
//    const currentValue = parseFloat(rangeInput.value);
//    rangeValue.textContent = `${currentValue} PLN`;
//    const handlePosition = ((currentValue - rangeInput.min) / (rangeInput.max - rangeInput.min)) * 100;
//    rangeValue.style.left = `${handlePosition}%`;
//  };
//
//  const displayInitialValue = () => {
//    rangeValue.textContent = `${parseFloat(rangeInput.value)} PLN`;
//    rangeValue.style.display = 'none';
//  };
//
//    rangeInput.addEventListener('mouseup', function() {
//        rangeValue.style.display = 'none';
//    });
//
//  rangeInput.addEventListener('mousedown', function() {
//    if (rangeValue.textContent === '') {
//      displayInitialValue();
//    }
//  });
//
//  rangeInput.addEventListener('input', function() {
//    updateValue();
//  });
//
//  displayInitialValue();
//  updateValue();
//});





//______________________


//document.addEventListener('DOMContentLoaded', function() {
//    const rangeInput = document.getElementById('customRange');
//    const rangeValue = document.getElementById('rangeValue');
//
//    rangeInput.addEventListener('mousedown', function() {
//        rangeValue.style.display = 'block';
//    });
//
////    rangeInput.addEventListener('mouseup', function() {
////        rangeValue.style.display = 'none';
////    });
//
//    rangeInput.addEventListener('input', function() {
////        rangeValue.textContent = rangeInput.value;
////        const handlePosition = ((rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min)) * 100;
////        rangeValue.style.left = `${handlePosition}%`;
//        const currentValue = parseFloat(rangeInput.value);
//        rangeValue.textContent = `${currentValue} PLN`;
//        const handlePosition = ((rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min)) * 100;
//        rangeValue.style.left = `${handlePosition}%`;
//    });
////
////    // Set initial value and position
////    rangeValue.textContent = rangeInput.value;
////    const handlePosition = ((rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min)) * 100;
////    rangeValue.style.left = `${handlePosition}%`;
//    // Set initial value and position
//    const initialValue = parseFloat(rangeInput.value);
//    rangeValue.textContent = `${initialValue} PLN`;
//    const handlePosition = ((initialValue - rangeInput.min) / (rangeInput.max - rangeInput.min)) * 100;
//    rangeValue.style.left = `${handlePosition}%`;
//});
