import helmet from "helmet";
import uuidv4 from "uuid/v4";
import express from "express";
import bodyParser from "body-parser";
import Logger from "@@src/nodejs/utils/logger";
import utilCsp from "@@src/nodejs/utils/server/utilCsp";
import utilXss from "@@src/nodejs/utils/server/utilXss";
import { getProcessEnv, isDev, base64 } from "@@src/nodejs/utils/helpers";

export default (app: express.Application): void => {
  // Create a nonce on every request and make it available to other middleware
  app.use((req, res, next): void => {
    res.locals.nonce = base64(Buffer.from(uuidv4()).toString("utf8"), {
      type: "nonce"
    });
    next();
  });
  const nonce = (req: express.Request, res: express.Response): string =>
    `'nonce-${res.locals.nonce}'`;
  const scriptSrc = [nonce, "'strict-dynamic'", "'unsafe-inline'", "https:"];
  // In dev we allow 'unsafe-eval', so HMR doesn't trigger the CSP
  if (isDev()) {
    scriptSrc.push("'unsafe-eval'");
  }

  if (!isDev() || getProcessEnv("_WEB", true) === "true") {
    app.use(
      helmet({
        xssFilter: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          reportUri: `/${getProcessEnv("ALL_PATH_REPORT_XSS")}`
        },
        contentSecurityPolicy: {
          directives: {
            scriptSrc,
            reportUri: `/${getProcessEnv("ALL_PATH_REPORT_CSP")}`
          }
        }
      })
    );

    app.post(
      `/${getProcessEnv("ALL_PATH_REPORT_CSP")}`,
      bodyParser.json({
        type: ["json", "application/csp-report"]
      }),
      (req, res): void => {
        if (isDev()) {
          utilCsp();
        }
        if (req.body && (isDev() ? true : utilCsp())) {
          const cNumber = utilCsp(true);
          req.body.controlVars = cNumber;
          req.body.controlVars.numberWith =
            ((cNumber as { c: number }).c % 600) + 1;
          new Logger("csp_violation:report")
            .isLogging(true)
            .createError(JSON.stringify(req.body, null, 2));
        }
        res.status(204).end();
      }
    );

    app.post(
      `/${getProcessEnv("ALL_PATH_REPORT_XSS")}`,
      bodyParser.json(),
      (req, res): void => {
        if (isDev()) {
          utilXss();
        }
        if (req.body && (isDev() ? true : utilXss())) {
          const cNumber = utilXss(true);
          req.body.controlVars = cNumber;
          req.body.controlVars.numberWith =
            ((cNumber as { c: number }).c % 600) + 1;
          new Logger("xss_violation:report")
            .isLogging(true)
            .createError(JSON.stringify(req.body, null, 2));
        }
        res.status(204).end();
      }
    );
  }
};
