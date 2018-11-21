// html skeleton provider
const template = (content) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link rel="manifest" href="assets/manifest.json">
      <link rel="apple-touch-icon" sizes="180x180" href="media/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="media/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="media/favicon-16x16.png">
      <link rel="mask-icon" href="media/safari-pinned-tab.svg" color="#7b7b7b">
      <meta name="msapplication-TileColor" content="#ededed">
      <meta name="theme-color" content="#ededed">
      <title>FlickrClone</title>
      <link href="assets/style.css" rel="stylesheet">
    </head>
    <body>
      <div class="content">
        <div id="app" class="wrap-inner">${content}</div>
      </div>
      <script src="assets/client.js"></script>
    </body>
    </html>
  `;
}

module.exports = template;
