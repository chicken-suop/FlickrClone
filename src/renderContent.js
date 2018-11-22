import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter } from 'react-router-dom';
import App from './components/app';

/* Render static markup */
const renderContent = (location) => {
  // Create stylesheet
  const sheet = new ServerStyleSheet();

  // Collect styles
  const html = renderToString(
    sheet.collectStyles(
      <StaticRouter location={location} context={{}}>
        <App />
      </StaticRouter>,
    ),
  );

  // Get tags from stylesheet
  const styles = sheet.getStyleTags();

  return { html, styles };
};

module.exports = renderContent;
