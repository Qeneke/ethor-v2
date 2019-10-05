import Document, {
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext
} from "next/document";

export default class MyDocument extends Document<Document & { nonce: string }> {
  public static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    if (
      ctx.res &&
      ((ctx.res as unknown) as { locals: { [key: string]: string } }).locals
    ) {
      ((initialProps as unknown) as {
        nonce: string;
      }).nonce = ((ctx.res as unknown) as {
        locals: { [key: string]: string };
      }).locals.nonce;
    }
    return {
      ...initialProps
    };
  }

  public render(): JSX.Element {
    const { nonce } = this.props;
    return (
      <html>
        <Head nonce={nonce} />
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </html>
    );
  }
}
