/* eslint-disable global-require,import/no-dynamic-require,security/detect-non-literal-require */
import { getProcessEnv, isDev } from "@@src/nodejs/utils/helpers";
import Logger from "@@src/nodejs/utils/logger";
import express from "express";
import http from "http";
import https from "https";
import selfsigned from "selfsigned";
import cookieParser from "cookie-parser";
import next from "next";
import helmet from "helmet";
import csp from "@@src/nodejs/utils/server/csp";

class Server {
  private _app: express.Application;

  private _appName: string;

  public constructor({ appName }: { appName: string }) {
    this._app = express();
    this._appName = appName;
  }

  public start(): void {
    this.first();
    if (
      getProcessEnv("_API", true) &&
      getProcessEnv(`${this._appName}_API_NODEJS_GRAPHQL`) === "true"
    )
      this.api();
    if (
      getProcessEnv("_WEB", true) &&
      getProcessEnv(`${this._appName}_WWW_NEXTJS`) === "true"
    )
      this.web();
    this.end();
    this.listen();
  }

  public first(): void {
    this._app.use(cookieParser());
    csp(this._app);
  }

  public end(): void {
    this._app.use(helmet.hidePoweredBy({ setTo: "PHP 7.3.8" }));
  }

  public api(): void {
    if (getProcessEnv(`${this._appName}_API_NODEJS_GRAPHQL`) === "false") {
      return;
    }
    if (require(`../../api/${this._appName}`).default.GraphqlApi) {
      require(`../../api/${this._appName}`).default.GraphqlApi({
        app: this._app,
        appName: this._appName
      });
    } else {
      new Logger(`${this._appName}:api:configure:api:graphql`).createError(
        "Try again because graphql api don't load"
      );
    }
  }

  public async web(): Promise<void> {
    const app = next({ dev: isDev(), dir: `./www/nextjs/${this._appName}` });
    const handle = app.getRequestHandler();
    await app.prepare();
    // app.setAssetPrefix("/prefix/");

    this._app.get("/@:username", (req, res): unknown => {
      return app.render(req, res, "/user", {
        username: (req.params as { username: string }).username
      });
    });
    this._app.get("/user", (req, res): unknown => {
      return app.render404(req, res);
    });

    this._app.get("*", (req, res): unknown => {
      // if (req.originalUrl.search("/prefix/_next") !== 0) {
      //   req.url = req.originalUrl.replace("/prefix", "/_next");
      // } else {
      //   req.url = req.originalUrl.replace("/prefix", "");
      // }
      return handle(req, res);
    });

    if (isDev()) {
      // eslint-disable-next-line global-require,import/no-extraneous-dependencies,@typescript-eslint/no-var-requires,import/no-unresolved
      const open = require("open");
      open(getProcessEnv(`${this._appName}_LOCALHOST_LINK`));
    }
  }

  public listen(): void {
    let server;
    if (getProcessEnv(`${this._appName}_SELFSIGNED`) === "true") {
      const { private: key, cert } = selfsigned.generate(null, {
        clientCertificate: true
      });
      server = https.createServer({ key, cert }, this._app);
      if (isDev()) {
        // eslint-disable-next-line global-require,import/no-extraneous-dependencies,@typescript-eslint/no-var-requires
        const { createProxyServer } = require("http-proxy");
        server.on("upgrade", (req: {}, socket: {}, head: {}): void => {
          createProxyServer({
            target: {
              host: getProcessEnv(`${this._appName}_LOCALHOST_LINK`),
              port: 3001
            }
          }).ws(req, socket, head);
        });
      }
    } else {
      server = http.createServer(this._app);
    }
    if (
      isDev() &&
      getProcessEnv("_WEB", true) &&
      getProcessEnv(`${this._appName}_WWW_NEXTJS`) === "false"
    ) {
      return;
    }
    if (
      isDev() &&
      getProcessEnv("_API", true) &&
      getProcessEnv(`${this._appName}_API_NODEJS_GRAPHQL`) === "false"
    ) {
      return;
    }
    server.listen(getProcessEnv(`${this._appName}_PORT`), (): void => {
      if (isDev() && getProcessEnv("_API", true)) {
        // eslint-disable-next-line global-require,import/no-extraneous-dependencies,@typescript-eslint/no-var-requires,import/no-unresolved
        const open = require("open");
        open(getProcessEnv(`${this._appName}_LOCALHOST_LINK`));
      }
      new Logger(
        `${this._appName}:app:start_http${
          getProcessEnv("_SSL", true) === "true" ? "s" : ""
        }`
      )
        .isLogging(true)
        .createLog(
          `App listening on port ${getProcessEnv(
            `${this._appName}_PORT`
          )}! link: ${getProcessEnv(`${this._appName}_LOCALHOST_LINK`)}`
        );
    });
  }
}

export default Server;
