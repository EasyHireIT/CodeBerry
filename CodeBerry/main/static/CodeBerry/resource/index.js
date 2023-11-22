export function showDetails(jobId) {
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

export function toggleFavorite(event) {
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