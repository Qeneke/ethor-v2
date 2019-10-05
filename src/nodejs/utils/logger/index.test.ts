import Logger from "@@src/nodejs/utils/logger";
import { getProcessEnv } from "@@src/nodejs/utils/helpers";

describe("src:nodejs:utils:logger", () => {
  it("test", () => {
    const testing = new Logger("run:test");
    expect(testing.logging).toBe(undefined);
    expect(testing.ext).toBe("run:test");
    expect(testing.name).toBe(`${getProcessEnv("ALL_NAME_APP")}:_default_`);
  });
  it("test setLogging true", () => {
    const testing = new Logger("test", "app").isLogging(true);
    expect(testing.logging).toBe(true);
    expect(testing.ext).toBe("test");
    expect(testing.name).toBe(`app`);
  });
  it("test setLogging false", () => {
    const testing = new Logger("test", "app").isLogging(false);
    expect(testing.logging).toBe(false);
    expect(testing.ext).toBe("test");
    expect(testing.name).toBe(`app`);
  });
  it("test createLog", () => {
    const testing = new Logger("test", "app").createLog("test");
    expect(testing).toStrictEqual(new Logger("test", "app"));
  });
  it("test createError", () => {
    const testing = new Logger("test", "app").createError("test");
    expect(testing).toStrictEqual(new Logger("test", "app"));
  });
});
