"use strict";

// html skeleton provider
var template = function template(content) {
  return "\n    <!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n      <meta charset=\"utf-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n      <link rel=\"manifest\" href=\"assets/manifest.json\">\n      <link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"media/apple-touch-icon.png\">\n      <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"media/favicon-32x32.png\">\n      <link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"media/favicon-16x16.png\">\n      <link rel=\"mask-icon\" href=\"media/safari-pinned-tab.svg\" color=\"#7b7b7b\">\n      <meta name=\"msapplication-TileColor\" content=\"#ededed\">\n      <meta name=\"theme-color\" content=\"#ededed\">\n      <title>FlickrClone</title>\n      <link href=\"assets/style.css\" rel=\"stylesheet\">\n    </head>\n    <body>\n      <div class=\"content\">\n        <div id=\"app\" class=\"wrap-inner\">".concat(content, "</div>\n      </div>\n      <script src=\"assets/client.js\"></script>\n    </body>\n    </html>\n  ");
};

module.exports = template;