import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {

  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/images/logo.png" type="image/png" />
          <link rel="apple-touch-icon" href="/images/logo.png" type="image/png" />
          <link rel="icon" sizes="192x192" href="/images/logo.png" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Top songs" />
          <meta
            property="robots"
            content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Top songs</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

}

export default MyDocument;
