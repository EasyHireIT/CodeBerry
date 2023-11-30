// TODO: check if 'wybierz plik' button works 
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.file-droppable').forEach(function(droppable) {
    var originalText = droppable.querySelector('.drop-area').innerHTML;
    var input = droppable.querySelector('.file-input');

    var fileChanged = function() {
      var files = input.files;
      if (files.length) {
        droppable.querySelector('span').style.display = 'block';
        droppable.querySelector('.drop-area').innerHTML = '';
        for (var i = 0; i < files.length; i++) {
          droppable.querySelector('.drop-area').innerHTML += files[i].name + '<br>';
        }
        droppable.classList.add('filled');
      } else {
        droppable.querySelector('.drop-area').innerHTML = originalText;
        droppable.classList.remove('filled');
        droppable.querySelector('span').style.display = 'none';
      }
    };

    input.addEventListener('change', fileChanged);
    fileChanged();

    droppable.addEventListener('dragenter', function(e) {
      e.preventDefault();
      droppable.classList.add('drag-over');
    });

    droppable.addEventListener('dragleave', function(e) {
      e.preventDefault();
      droppable.classList.remove('drag-over');
    });

    droppable.addEventListener('dragover', function(e) {
      e.preventDefault();
    });

    droppable.addEventListener('drop', function(e) {
      e.preventDefault();
      droppable.classList.remove('drag-over');
      var files = e.dataTransfer.files;
      handleFiles(files, droppable);
    });

    // Ensure the whole area is responsive to file dragging
    droppable.addEventListener('dragover', function(e) {
      e.preventDefault();
      droppable.classList.add('drag-over');
    });

    droppable.addEventListener('dragleave', function(e) {
      e.preventDefault();
      droppable.classList.remove('drag-over');
    });

    // Handle click event to trigger file input
    droppable.addEventListener('click', function(e) {
      if (e.target !== droppable.querySelector('span')) {
        input.click();

      }
    });

    // Handle removal of files when the 'X' button is clicked
    droppable.querySelector('span').addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default behavior
      input.value = '';
      fileChanged();
    });
  });
});


function handleFiles(files, droppable) {
  if (files.length) {
    droppable.querySelector('span').style.display = 'block';
    droppable.querySelector('.drop-area').innerHTML = '';
    for (var i = 0; i < files.length; i++) {
      droppable.querySelector('.drop-area').innerHTML += files[i].name + '<br>';
    }
    droppable.classList.add('filled');
  } else {
    droppable.querySelector('.drop-area').innerHTML = originalText;
    droppable.classList.remove('filled');
    droppable.querySelector('span').style.display = 'none';
  }
}