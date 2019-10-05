import "@@utils/helpers/_app.initial";

import React, { ErrorInfo, ReactElement } from "react";
import App, { AppInitialProps, AppContext } from "next/app";
import NProgress from "nprogress";
import Router from "next/router";

const handleRouteChange = (url: string): void => {
  console.log("App is changing to: ", url);
  NProgress.start();
};
const handleRouteComplete = (): void => {
  NProgress.done();
};
const handleRouteError = (): void => {
  NProgress.done();
};

const Noop = ({ children }: { children: ReactElement }): JSX.Element =>
  children;

export default class ThisIsApp extends App {
  public static async getInitialProps(
    appContext: AppContext
  ): Promise<AppInitialProps> {
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("CUSTOM ERROR HANDLING", error);
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }
  // eslint-disable-next-line
  public componentDidMount(): void {
    Router.events.on("routeChangeStart", handleRouteChange);
    Router.events.on("routeChangeComplete", handleRouteComplete);
    Router.events.on("routeChangeError", handleRouteError);
  }

  // eslint-disable-next-line
  public componentWillUnmount(): void {
    Router.events.off("routeChangeStart", handleRouteChange);
    Router.events.off("routeChangeComplete", handleRouteComplete);
    Router.events.off("routeChangeError", handleRouteError);
  }

  public render(): JSX.Element {
    const { Component, pageProps } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Layout = (Component as any).Layout || Noop;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}
