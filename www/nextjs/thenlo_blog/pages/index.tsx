import { NextPage } from "next";
import Link from "@@components/Link";
import { ReactElement } from "react";

const Home: NextPage = (): JSX.Element => {
  return (
    <div>
      <Link
        href={{
          pathname: "/user",
          query: { username: "shenburak" }
        }}
        prefetch={false}
        as={{ pathname: "/@shenburak" }}
      >
        <a>First {process.env.ALL_NAME_APP} Post</a>
      </Link>
      salam
    </div>
  );
};

const Layout = ({ children }: { children: ReactElement }): JSX.Element => {
  return <main style={{ border: "4px dashed blue" }}>{children}</main>;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Home as any).Layout = Layout;
export default Home;
