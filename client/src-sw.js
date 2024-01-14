// Importing required modules from Workbox
const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precaching and routing based on the provided manifest
precacheAndRoute(self.__WB_MANIFEST);

// Configuring CacheFirst strategy for pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    // CacheableResponsePlugin for handling certain response statuses
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // ExpirationPlugin for setting a maximum age for cached items
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warming up the page cache with specified URLs
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Registering a route for navigation requests using the pageCache strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Registering a route for image requests using CacheFirst strategy
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'asset-cache',
    plugins: [
      // CacheableResponsePlugin for handling certain response statuses
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      // ExpirationPlugin for setting a maximum number of entries and maximum age for cached items
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, 
      })
    ],
  })
);
