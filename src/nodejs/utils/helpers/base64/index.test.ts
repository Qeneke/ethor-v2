import { base64, unbase64, list, Type, testString } from "./";

describe("src:nodejs:utils:helpers:base64", () => {
  list.forEach((element): void => {
    it("unbase64_and_base64:" + element, () => {
      expect(
        unbase64(
          base64(testString, {
            type: element as Type
          }),
          { type: element as Type }
        )
      ).toBe(testString);
    });
  });
});
