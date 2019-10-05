declare module "graphql-depth-limit" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const depthLimit: (depth: number, a: {}, b?: (w: number) => void) => any;
  export default depthLimit;
}
