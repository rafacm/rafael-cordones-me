import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className={'antialiased bg-body text-body font-body'}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
