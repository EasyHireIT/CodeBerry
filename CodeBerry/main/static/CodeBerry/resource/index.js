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

//function toggleSubjectDetails(event, jobId, newIcon) {
//    event.stopPropagation(); // Prevents event bubbling to the outer div
//
//    var details = document.getElementById('details_' + jobId);
//
//    // Toggle the visibility of the details based on its current state
//    if (details.style.display === 'none' || window.getComputedStyle(details).display === 'none') {
//        details.style.display = 'block'; // Show details if initially hidden
//    } else {
//        details.style.display = 'none'; // Hide details if initially shown
//    }
//}

//function toggleSubjectDetails(event, jobId, newIcon) {
//    event.stopPropagation(); // Prevents event bubbling to the outer div
//
//    var details = document.getElementById('details_' + jobId);
//    var icon = document.querySelector(`[data-job-id="${jobId}"]`);
//
//    // Toggle the visibility of the details based on its current state
//    if (details.style.display === 'none' || window.getComputedStyle(details).display === 'none') {
//        details.style.display = 'block'; // Show details if initially hidden
////        icon.textContent = '▲'; // Change the text content to ▲ when expanded
//         icon.innerHTML = '<svg>Your Custom SVG Code Here</svg>';
//    } else {
//        details.style.display = 'none'; // Hide details if initially shown
////        icon.textContent = '▼'; // Change the text content to ▼ when collapsed
//         icon.innerHTML = '<svg>Your Custom SVG Code Here</svg>';
//    }
//}

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

function toggleFavorite(event) {
    event.stopPropagation(); // Prevent the event from reaching the offer box
    const star = event.target;
    star.classList.toggle('active');
    // TODO: Logic to handle adding/removing from favorites
    if (star.classList.contains('active')) {
        // TODO: Code to add the offer to favorites
        console.log("Added to favorites");
    } else {
        // TODO:  Code to remove the offer from favorites
        console.log("Removed from favorites");
    }
}