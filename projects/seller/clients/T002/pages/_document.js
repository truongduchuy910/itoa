import theme from '../theme';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/color-mode';
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="vi">
        <Head />
        <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
