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
            iconDiv.style.right = '6rem';
            iconDiv.style.zIndex = '1000';
            iconDiv.style.padding = '10px';

            let iconUrl;
            switch (framework) {
                case 'wordpress':
                    iconUrl = 'https://s.w.org/favicon.ico?2'; // Official WordPress favicon
                    break;
                case 'drupal':
                    iconUrl = 'https://www.drupal.org/favicon.ico'; // Official Drupal favicon
                    break;
                case 'laravel':
                    iconUrl = 'https://laravel.com/img/logomark.min.svg'; // Official Laravel logomark
                    break;
                case 'react':
                    iconUrl = 'https://reactjs.org/favicon.ico'; // Official React favicon
                    break;
                case 'vue':
                    iconUrl = 'https://vuejs.org/images/logo.png'; // Official Vue.js logo
                    break;
                case 'angular':
                    iconUrl = 'https://angular.io/assets/images/favicons/favicon.ico'; // Official Angular favicon
                    break;
                case 'django':
                    iconUrl = 'https://www.djangoproject.com/m/img/logos/django-logo-positive.svg'; // Official Django logo
                    break;
                case 'ruby-on-rails':
                    iconUrl = 'https://rubyonrails.org/favicon.ico'; // Official Ruby on Rails favicon
                    break;
                case 'spring':
                    iconUrl = 'https://spring.io/favicon.ico'; // Official Spring favicon
                    break;
                case 'svelte':
                    iconUrl = 'https://svelte.dev/favicon.png'; // Official Svelte favicon
                    break;
                case 'ember':
                    iconUrl = 'https://emberjs.com/images/icons/favicon.ico'; // Official Ember.js favicon
                    break;
                case 'flask':
                    iconUrl = 'https://flask.palletsprojects.com/en/2.2.x/_static/flask-icon.png'; // Official Flask logo
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

