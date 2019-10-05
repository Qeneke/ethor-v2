import { getProcessEnv } from "@@src/nodejs/utils/helpers";

describe("src:nodejs:utils:helpers:getProcessEnv", () => {
  it("getProcessEnv found", () => {
    const testing = getProcessEnv("NODE_ENV", true);
    expect(testing).toBe("test");
  });
  it("getProcessEnv not found", () => {
    const testing = getProcessEnv("_notfound", true);
    expect(testing).toBe(undefined);
  });
});
