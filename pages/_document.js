import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <title>Hello</title>
        <Head>
          <style>{'body { margin: 0 } /* custom! */'}</style>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
