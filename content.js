// Check if the current domain is a local environment
function isLocalEnvironment() {
    const host = window.location.host;
    return /(\.site|localhost)(:\d+)?$/.test(host);
}

// Detect framework by looking for specific clues in the DOM or common file paths
function detectFramework() {
    // Check for WordPress
    if (document.querySelector('link[href*="wp-content"]') || document.querySelector('script[src*="wp-includes"]')) {
        return 'wordpress';
    }

    // Check for Drupal
    if (document.querySelector('script[src*="misc/drupal.js"]') || document.querySelector('[data-drupal-link-system-path]')) {
        return 'drupal';
    }

    // Check for Laravel
    if (document.querySelector('link[href*="mix-manifest.json"]') || document.querySelector('meta[name="csrf-token"]')) {
        return 'laravel';
    }

    // Check for React
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        return 'react';
    }

    // Check for Vue.js
    if (document.querySelector('[data-vue-root]') || document.querySelector('script[src*="vue.js"]')) {
        return 'vue';
    }

    // Check for Angular
    if (document.querySelector('script[src*="angular.js"]') || document.querySelector('script[src*="zone.js"]')) {
        return 'angular';
    }

    // Check for Django
    if (document.querySelector('script[src*="django.js"]') || document.querySelector('[data-django]')) {
        return 'django';
    }

    // Check for Ruby on Rails
    if (document.querySelector('meta[name="csrf-param"]') && document.querySelector('meta[name="csrf-token"]')) {
        return 'ruby-on-rails';
    }

    // Check for Spring
    if (document.querySelector('meta[name="spring"]') || document.querySelector('script[src*="spring.js"]')) {
        return 'spring';
    }

    // Check for Svelte
    if (document.querySelector('script[src*="svelte"]')) {
        return 'svelte';
    }

    // Check for Ember.js
    if (document.querySelector('script[src*="ember.js"]')) {
        return 'ember';
    }

    // Check for Flask
    if (document.querySelector('script[src*="flask.js"]') || document.querySelector('meta[name="flask"]')) {
        return 'flask';
    }

    // Check for Next.js
    if (document.querySelector('script[src*="_next/static"]') || document.querySelector('script[src*="next.js"]')) {
        return 'next.js';
    }

    // Check for Nuxt.js
    if (document.querySelector('script[src*="nuxt.js"]') || document.querySelector('meta[name="nuxt"]')) {
        return 'nuxt.js';
    }

    // Check for Symfony
    if (document.querySelector('meta[name="symfony"]') || document.querySelector('script[src*="symfony.js"]')) {
        return 'symfony';
    }

    // Check for ASP.NET
    if (document.querySelector('meta[name="x-aspnet-version"]') || document.querySelector('meta[name="x-powered-by"]')) {
        return 'asp.net';
    }

    // Check for Express.js
    if (document.querySelector('meta[name="x-powered-by"]') && document.querySelector('meta[content*="Express"]')) {
        return 'express';
    }

    return null;
}

// Add viewport dimensions to body content data-content attribute
function updateViewportDebug(element) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    element.setAttribute('data-content', viewportWidth + ' x ' + viewportHeight);
}

// Toggle visibility of the debug information
function toggleDebugInfo() {
    const iconDiv = document.getElementById('framework-icon');
    const localDevElement = document.querySelector('.local-dev');
    if (iconDiv.style.display === 'none') {
        iconDiv.style.display = 'block';
        localDevElement.setAttribute('data-content', window.innerWidth + ' x ' + window.innerHeight);
    } else {
        iconDiv.style.display = 'none';
        localDevElement.setAttribute('data-content', '');
    }
}

// Initialize the extension
function init() {
    if (isLocalEnvironment()) {
        const localDevElement = document.body;
        localDevElement.classList.add('local-dev');

        // Create the toggler button
        const toggler = document.createElement('button');
        toggler.id = 'debug-toggler';
        toggler.innerText = 'X';
        toggler.style.position = 'fixed';
        toggler.style.bottom = '0';
        toggler.style.right = '0';
        toggler.style.zIndex = '1001';
        toggler.style.padding = '0.25rem';
        toggler.style.background = '#ff5733';
        toggler.style.color = '#fff';
        toggler.style.border = 'none';
        toggler.style.cursor = 'pointer';

        toggler.addEventListener('click', toggleDebugInfo);
        document.body.appendChild(toggler);

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
                    iconUrl = 'https://s.w.org/favicon.ico?2';
                    break;
                case 'drupal':
                    iconUrl = 'https://www.drupal.org/favicon.ico';
                    break;
                case 'laravel':
                    iconUrl = 'https://laravel.com/img/logomark.min.svg';
                    break;
                case 'react':
                    iconUrl = 'https://reactjs.org/favicon.ico';
                    break;
                case 'vue':
                    iconUrl = 'https://vuejs.org/images/logo.png';
                    break;
                case 'angular':
                    iconUrl = 'https://angular.io/assets/images/favicons/favicon.ico';
                    break;
                case 'django':
                    iconUrl = 'https://www.djangoproject.com/m/img/logos/django-logo-positive.svg';
                    break;
                case 'ruby-on-rails':
                    iconUrl = 'https://rubyonrails.org/favicon.ico';
                    break;
                case 'spring':
                    iconUrl = 'https://spring.io/favicon.ico';
                    break;
                case 'svelte':
                    iconUrl = 'https://svelte.dev/favicon.png';
                    break;
                case 'ember':
                    iconUrl = 'https://emberjs.com/images/icons/favicon.ico';
                    break;
                case 'flask':
                    iconUrl = 'https://flask.palletsprojects.com/en/2.2.x/_static/flask-icon.png';
                    break;
                case 'next.js':
                    iconUrl = 'https://nextjs.org/static/favicon/favicon.ico';
                    break;
                case 'nuxt.js':
                    iconUrl = 'https://nuxtjs.org/_nuxt/icons/icon_64x64.5f6a36.png';
                    break;
                case 'symfony':
                    iconUrl = 'https://symfony.com/logos/symfony_black_03.svg';
                    break;
                case 'asp.net':
                    iconUrl = 'https://dotnet.microsoft.com/favicon.ico';
                    break;
                case 'express':
                    iconUrl = 'https://expressjs.com/images/favicon.png';
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
