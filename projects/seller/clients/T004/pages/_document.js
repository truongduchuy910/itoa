import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="vi">
        <Head />
        <meta
          name="google-site-verification"
          content="RQqHvAvrvjtnKg5DSLjuGENCQFpI56nnrLQbmV4B0QM"
        />
        <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
