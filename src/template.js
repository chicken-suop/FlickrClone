// html skeleton provider
const template = ({ reactDom, styles, preloadedData }) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="manifest" href="/manifest.json">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ea3580">
    <meta name="msapplication-TileColor" content="#ea3580">
    <meta name="theme-color" content="#eeeeee">
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">
    <title>FlickrClone</title>
    <meta name="Description" content="Clone of Flickr. By Elliot">
    ${styles}
    <style>
      :root {
        font-size: 62.5%;
      }

      body {
        margin: 0;
        font-size: 1.6rem;
      }

      /* Style for lazysizes transitions */
      .ls-blur-up-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
        font-family: "blur-up: always", "object-fit: cover";
        object-fit: cover;
        transform: scale(1.1);
        filter: blur(10px);
        opacity: 1;
        transition: transform 1500ms, opacity 1000ms, filter 1500ms;
      }

      /* Style for lazysizes transitions */
      .ls-blur-up-img.ls-inview.ls-original-loaded {
        opacity: 0;
        filter: blur(5px);
        transform: scale(1);
      }
    </style>

    <noscript>
      <style>
        .lazyloadimage {
          display: none;
        }
      </style>
    </noscript>

    <!-- Lazysizes is easiest to install like this -->
    <!-- Lazysizes Blur Up plugin from https://github.com/aFarkas/lazysizes/tree/master/plugins/blur-up -->
    <script src="https://afarkas.github.io/lazysizes/plugins/blur-up/ls.blur-up.min.js"></script>
    <!-- Lazysizes from https://github.com/aFarkas/lazysizes -->
    <script src="https://afarkas.github.io/lazysizes/lazysizes.min.js"></script>
  </head>
  <body>
    <div id="root">${reactDom}</div>
    <script>
      window.preloadedData = ${JSON.stringify(preloadedData)};
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js');
        });
      }
    </script>
    <script src="/client.js"></script>
    <script src="/vendors~client.js"></script>
  </body>
  </html>
`;

module.exports = template;
