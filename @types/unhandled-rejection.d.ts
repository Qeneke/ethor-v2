declare module "unhandled-rejection" {
  function unhandledRejection(opts: {
    timeout: number;
  }): { on: (type: string, _: (err: string) => void) => void };
  export default unhandledRejection;
}
