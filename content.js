// Check if the current domain is a local environment
function isLocalEnvironment() {
    const host = window.location.host;
    return /(\.site|localhost)(:\d+)?$/.test(host);
}

// Detect framework by looking for specific clues in the DOM or common file paths
function detectFramework() {
    // Check for WordPress by finding the wp-content directory or wp-config.php
    if (document.querySelector('link[href*="wp-content"]') || document.querySelector('script[src*="wp-includes"]')) {
        return 'wordpress';
    }

    // Check for Drupal by finding drupal-specific attributes or paths
    if (document.querySelector('script[src*="misc/drupal.js"]') || document.querySelector('[data-drupal-link-system-path]')) {
        return 'drupal';
    }

    // Check for Laravel by looking for Laravel Mix-manifest or specific meta tags
    if (document.querySelector('link[href*="mix-manifest.json"]') || document.querySelector('meta[name="csrf-token"]')) {
        return 'laravel';
    }

    // Check for React by checking if the React DevTools global hook is present
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        return 'react';
    }

    return null;
}

// Add viewport dimensions to body content data-content attribute
function updateViewportDebug(element) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    element.setAttribute('data-content', viewportWidth + ' x ' + viewportHeight);
}

// Initialize the extension
function init() {
    if (isLocalEnvironment()) {
        const localDevElement = document.body;
        localDevElement.classList.add('local-dev');

        const framework = detectFramework();
        if (framework) {
            localDevElement.classList.add(`framework-${framework}`);

            // Display framework icon
            const iconDiv = document.createElement('div');
            iconDiv.id = 'framework-icon';
            iconDiv.style.position = 'fixed';
            iconDiv.style.bottom = '0';
            iconDiv.style.right = '0';
            iconDiv.style.zIndex = '1000';
            iconDiv.style.padding = '10px';

            let iconUrl;
            switch (framework) {
                case 'wordpress':
                    iconUrl = 'https://example.com/icons/wordpress-icon.png';
                    break;
                case 'drupal':
                    iconUrl = 'https://example.com/icons/drupal-icon.png';
                    break;
                case 'laravel':
                    iconUrl = 'https://example.com/icons/laravel-icon.png';
                    break;
                case 'react':
                    iconUrl = 'https://example.com/icons/react-icon.png';
                    break;
                default:
                    iconUrl = null;
            }

            if (iconUrl) {
                const img = document.createElement('img');
                img.src = iconUrl;
                img.alt = `${framework.charAt(0).toUpperCase() + framework.slice(1)}`;
                iconDiv.appendChild(img);
                document.body.appendChild(iconDiv);
            }
        }

        updateViewportDebug(localDevElement);
        window.addEventListener('resize', function () {
            updateViewportDebug(localDevElement);
        });
    }
}

init();

