declare module "edit-json-file" {
  const editJsonFile: (
    dir: string,
    opts?: { autosave: boolean }
  ) => {
    get: (name: string) => string;
    set: (name: string, set: string) => void;
    toObject: () => { [s: string]: { [s: string]: string } };
    save: () => void;
  };
  export default editJsonFile;
}
