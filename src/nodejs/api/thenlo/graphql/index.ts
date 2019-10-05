import express from "express";
import { ApolloServer, GraphQLOptions } from "apollo-server-express";
import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import { getProcessEnv } from "@@src/nodejs/utils/helpers";
import { buildFederatedSchema } from "@apollo/federation";
import costAnalysis from "graphql-cost-analysis";
import depthLimit from "graphql-depth-limit";
import { GraphQLError } from "graphql";
import helpers from "./helpers";

class EnhancedServer extends ApolloServer {
  public async createGraphQLServerOptions(
    req: express.Request,
    res: express.Response
  ): Promise<GraphQLOptions> {
    const options = await super.createGraphQLServerOptions(req, res);

    options.validationRules = [
      costAnalysis({
        variables: req.headers.fromgateway
          ? JSON.parse(req.headers.fromgateway as string).variables
          : req.body.variables,
        maximumCost: 150,
        defaultCost: 1,
        onComplete: (costs: number): void => {
          console.log(`costxs: ${costs} (max: 1234)`);
        }
      }),
      depthLimit(10, {} /* , (depths: number): void => console.log(depths) */)
    ];

    return options;
  }
}
export const GraphqlApi = ({
  app,
  appName
}: {
  app: express.Application;
  appName: string;
}): void => {
  const { services, link } = helpers({ app, appName });

  let serviceList = [{ name: "", url: "" }];
  serviceList = [];

  const path = `${getProcessEnv("ALL_PATH_GRAPHQL")}`;

  interface ContextFederation {
    fromgateway: () => void;
    fromfederation: () => void;
  }
  services.map((service: string): boolean => {
    // eslint-disable-next-line import/no-dynamic-require,global-require,security/detect-non-literal-require
    const typeDefs = require(`./services/${service}/typeDefs`).default;
    // eslint-disable-next-line import/no-dynamic-require,global-require,security/detect-non-literal-require
    const resolvers = require(`./services/${service}/resolvers`).default;

    new EnhancedServer({
      engine: false,
      context: ({ req /* , res */ }): ContextFederation => {
        const fromfederation = {
          headers: req.headers,
          cookies: req.cookies
        };
        return {
          fromgateway: (): unknown =>
            JSON.parse((req.headers as { fromgateway: string }).fromgateway),
          fromfederation: (): unknown => fromfederation
        };
      },
      schema: buildFederatedSchema([
        {
          resolvers,
          typeDefs
        }
      ])
    }).applyMiddleware({
      app,
      path: `/${path}_${service}`
    });
    serviceList.push({
      name: service,
      url: `${link}/${path}_${service}`
    });
    return true;
  });

  interface ContextGateway {
    userId: string;
    headers: unknown;
    cookies: { [key: string]: string };
  }
  interface RequesT {
    headers: { set: (a: string, b: string) => void };
  }
  interface ContexT {
    userId: string;
    cookies: { [key: string]: string };
    headers: { [key: string]: string };
  }
  new EnhancedServer({
    context: ({ req /* , res */ }): ContextGateway => {
      return {
        userId: "userId",
        headers: req.headers,
        cookies: req.cookies
      };
    },
    formatError: (err): GraphQLError => {
      if (
        err &&
        err.extensions &&
        err.extensions.response &&
        err.extensions.response.url
      ) {
        // eslint-disable-next-line prefer-destructuring,no-param-reassign
        err.extensions.response.url = err.extensions.response.url.split("_")[1];
      }
      return err;
    },
    engine: {
      apiKey: getProcessEnv("ENGINE_API_KEY"),
      schemaTag: "current"
    },
    gateway: new ApolloGateway({
      serviceList,
      introspectionHeaders: {
        [getProcessEnv("API_SERVER_AUTH_KEY") as string]: getProcessEnv(
          "API_SERVER_AUTH_ITEM"
        ) as string
      },
      buildService({ name, url }): RemoteGraphQLDataSource {
        return new RemoteGraphQLDataSource({
          url,
          willSendRequest({ request, context }): void {
            (request.http as RequesT).headers.set(
              "userId",
              ((context as unknown) as ContexT).userId
            );
            (request.http as RequesT).headers.set(
              getProcessEnv("API_SERVER_AUTH_KEY") as string,
              getProcessEnv("API_SERVER_AUTH_ITEM") as string
            );
            const fromgateway = {
              headers: ((context as unknown) as ContexT).headers,
              cookies: ((context as unknown) as ContexT).cookies,
              variables: request.variables,
              url,
              name
            };
            (request.http as RequesT).headers.set(
              "fromgateway",
              JSON.stringify(fromgateway)
            );
          }
        });
      }
      // debug: true
    }),
    subscriptions: false
    // tracing: true,
    // context: { context: "a" }
  }).applyMiddleware({
    app,
    path: `/${path}`
  });
};

export default GraphqlApi;
