declare module "selfsigned" {
  const selfsigned: {
    generate: (
      a: null,
      b: { clientCertificate: boolean }
    ) => { private?: string; cert?: string };
  };
  export default selfsigned;
}
