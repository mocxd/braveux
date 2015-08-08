// Slides the side navbar in and out like a boss
function toggleNav () {
    // grab the navBtn element
    var nav = document.getElementById('sideNav');

    // change the width depending on whether it is expanded
    if (nav.style.width === '0vw') {
        nav.style.width = '67vw';
        // set the transitions independently to achieve a 'flipped' easing
        nav.style.transition = 'width 500ms cubic-bezier(0.165, 0.840, 0.440, 1.000)';
    } else {
        nav.style.width = '0vw';
        nav.style.transition = 'width 500ms cubic-bezier(0.895, 0.030, 0.685, 0.220)';
    }

}

// Hides the navbar, useful for dismissing navbar by clicking on page
function collapseNav () {
    // grab the navBtn element
    var nav = document.getElementById('sideNav');

    // collapse it
    nav.style.width = '0vw';
    nav.style.transition = 'width 500ms cubic-bezier(0.895, 0.030, 0.685, 0.220)';
}