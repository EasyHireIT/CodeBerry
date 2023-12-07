function showDetails(jobId) {
    var details = document.getElementById('details_' + jobId);

    // Check if the element is initially hidden or shown (using getComputedStyle)
    var computedStyle = window.getComputedStyle(details);
    var display = computedStyle.getPropertyValue('display');

    if (display === 'none' || details.style.display === 'none') {
        details.style.display = 'block'; // Show details if initially hidden
    } else {
        details.style.display = 'none'; // Hide details if initially shown
    }
}

function toggleSubjectDetails(event, jobId, newIcon, element) {
    event.stopPropagation(); // Prevents event bubbling to the outer div

    var details = document.getElementById('details_' + jobId);
    var icon = document.querySelector(`[data-job-id="${jobId}"]`);

    var collapseSVGPath = '/static/CodeBerry/images/collapse.svg';
    var expandSVGPath = '/static/CodeBerry/images/expand.svg';

    var expandImg = new Image();
    expandImg.src = collapseSVGPath;
    expandImg.style.width = '15px';
    expandImg.style.height = '15px';

    var collapseImg = new Image();
    collapseImg.src = expandSVGPath;
   collapseImg.style.width = '15px';
    collapseImg.style.height = '15px';

    var textElement = element.querySelector('a');

    // Toggle the visibility of the details based on its current state
    if (details.style.display === 'none' || window.getComputedStyle(details).display === 'none') {
        details.style.display = 'block'; // Show details if initially hidden

        expandImg.onload = function() {
            icon.innerHTML = '';
            icon.appendChild(expandImg);
        };

        textElement.textContent = ' - Kliknij, aby zwinąć';

    } else {
        details.style.display = 'none'; // Hide details if initially shown

        collapseImg.onload = function() {
            icon.innerHTML = '';
            icon.appendChild(collapseImg);
        };

        textElement.textContent = ' - Kliknij, aby rozwinąć';
    }
}

function toggleFavorite(event, workOfferId) {
    event.stopPropagation(); // Prevent the event from reaching the offer box
    const star = event.target;

    // Toggle active class for the star icon
    star.classList.toggle('active');

    // AJAX call to handle adding/removing from favorites
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                // Handle success message as needed
            } else {
                console.error('Error:', xhr.statusText);
                // Handle error case
            }
        }
    };

    xhr.open('POST', `/toggle_favorite/${workOfferId}/`, true);
    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

function toggleFavouriteFilter() {
    const checkbox = document.getElementById('switchFavourites');
    const form = document.getElementById('favoriteFilterForm');

    // Submit form on toggle
    form.submit();
}

function toggleApplicationForm(event) {
    event.stopPropagation(); // Prevent the event from reaching the offer box
    // TODO: Logic to handle sending data
}