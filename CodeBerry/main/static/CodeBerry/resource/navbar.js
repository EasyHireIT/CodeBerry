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