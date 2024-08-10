// add viewport dimensions to body content data-content attribute
const localDev = document.querySelector('.local-dev');

function updateViewportDebug(element) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    element.setAttribute('data-content', viewportWidth + ' x ' + viewportHeight);
}

if (localDev) {
    updateViewportDebug(localDev);
    window.addEventListener('resize', function() {
        updateViewportDebug(localDev);
    });
}

