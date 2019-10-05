/* eslint-disable @typescript-eslint/no-var-requires,no-console,no-underscore-dangle */
const { config, parse } = require("dotenv");
const { resolve } = require("path");
const { readFileSync } = require("fs");

const constants = {
  SELFSIGNED: "SELFSIGNED",
  SSL: "SSL",

  WWW_NEXTJS: "WWW_NEXTJS",
  WWW_NEXTJS_PORT: "WWW_NEXTJS_PORT",

  API_NODEJS_GRAPHQL: "API_NODEJS_GRAPHQL",
  API_NODEJS_GRAPHQL_PORT: "API_NODEJS_GRAPHQL_PORT"
};

const envs = [
  {
    ...config({
      debug: process.env.DEBUG,
      path: resolve(process.cwd(), ".env")
    }),
    cfName: "secret"
  },
  {
    ...config({
      debug: process.env.DEBUG,
      path: resolve(process.cwd(), "public.env")
    }),
    cfName: "public"
  }
];
envs.map(env => {
  if (env.error) {
    console.error(env.error, `load:envs_${env.cfName}`);
  }
  return env;
});

const env = parse(readFileSync(resolve(process.cwd(), "public.env")));

const apps = [
  {
    name: "thenlo",
    envs: {
      [constants.SELFSIGNED]: false,
      [constants.SSL]: false,

      [constants.WWW_NEXTJS]: true,
      [constants.WWW_NEXTJS_PORT]: 3000,

      [constants.API_NODEJS_GRAPHQL]: true,
      [constants.API_NODEJS_GRAPHQL_PORT]: 4000
    }
  },
  {
    name: "thenlo_blog",
    envs: {
      [constants.SELFSIGNED]: false,
      [constants.SSL]: false,

      [constants.WWW_NEXTJS]: true,
      [constants.WWW_NEXTJS_PORT]: 3001,

      [constants.API_NODEJS_GRAPHQL]: false
    }
  },
  {
    name: "thenlo_game",
    envs: {
      [constants.SELFSIGNED]: false,
      [constants.SSL]: false,

      [constants.WWW_NEXTJS]: false,

      [constants.API_NODEJS_GRAPHQL]: true,
      [constants.API_NODEJS_GRAPHQL_PORT]: 4001
    }
  }
];

const envsCustom = {};
apps.map(app => {
  if (!(process.env.APPS as string).split(",").includes(app.name)) return {};
  return Object.keys(app.envs).map(envApp => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // eslint-disable-next-line security/detect-object-injection
    envsCustom[`${app.name}_${envApp}`] = app.envs[envApp];
    return {};
  });
});

Object.keys(envsCustom).map(envCustom => {
  // eslint-disable-next-line security/detect-object-injection
  process.env[envCustom] = (envsCustom as string)[
    (envCustom as unknown) as number
  ];
  return {};
});

apps.map(app => {
  if (!(process.env.APPS as string).split(",").includes(app.name)) return {};
  if (process.env._API && app.envs.API_NODEJS_GRAPHQL) {
    process.env[`${app.name}_PORT`] = (app.envs
      .API_NODEJS_GRAPHQL_PORT as unknown) as string;
  } else {
    process.env[`${app.name}_PORT`] = (app.envs
      .WWW_NEXTJS_PORT as unknown) as string;
  }
  process.env[`${app.name}_PROTOCOL`] = app.envs.SSL ? "https" : "http";
  process.env[`${app.name}_LOCALHOST_LINK`] = `${
    process.env[`${app.name}_PROTOCOL`]
    }://localhost:${process.env[`${app.name}_PORT`]}`;
  return {};
});

const publicEnvs = { ...env, ...envsCustom };

module.exports = { publicEnvs };
