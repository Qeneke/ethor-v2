/* eslint-disable no-nested-ternary */
import { php } from "locutus";
import { join } from "path";
import fs from "fs";
import isDev from "@@src/nodejs/utils/helpers/isDev";

const base64Alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

const encodeBase64Alphabet = (): string => {
  return base64Alphabet
    .split("")
    .sort((): number => {
      return 0.5 - Math.random();
    })
    .join("");
};
const createFileAndWriteEncodedAlphabet = (filename: string): void => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.open(filename, "r", (err): void => {
    if (err) {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.writeFile(
        filename,
        `export default "${encodeBase64Alphabet()}";
`,
        (erra): void => {
          if (erra) {
            // eslint-disable-next-line no-console
            console.error(erra);
          }
        }
      );
    }
  });
};

export type Type = "graphql" | "token-web" | "nonce";
export const list = ["graphql", "token-web", "nonce"];
list.forEach((element): void => {
  if (isDev()) {
    createFileAndWriteEncodedAlphabet(
      join(__dirname, "alphabets", `${element}.ts`)
    );
  }
});

export function base64(i: string, supererogatory: { type: Type }): string {
  // eslint-disable-next-line import/no-dynamic-require,global-require,security/detect-non-literal-require
  const encodeBase64AlphabetFile = require(`./alphabets/${supererogatory.type}`)
    .default;
  const string = Buffer.from(i, "utf8").toString("base64");
  return php.strings.strtr(string, base64Alphabet, encodeBase64AlphabetFile);
}

export function unbase64(i: string, supererogatory: { type: Type }): string {
  // eslint-disable-next-line import/no-dynamic-require,global-require,security/detect-non-literal-require
  const encodeBase64AlphabetFile = require(`./alphabets/${supererogatory.type}`)
    .default;
  const string = php.strings.strtr(i, encodeBase64AlphabetFile, base64Alphabet);
  return Buffer.from(string, "base64").toString("utf8");
}

export const testString = "çİ:ÇİÖEÖĞRfdvğş4üd6l:ÇW+^+XZ█Â/=←";

list.forEach((element): void => {
  unbase64(base64(testString, { type: element as Type }), {
    type: element as Type
  });
});
