import { useRouter } from "next/router";
import { NextPage } from "next";
import Link from "@@components/Link";

interface Props {
  salam: string;
}

const User: NextPage<Props> = (props): JSX.Element => {
  const router = useRouter();
  console.log(props, router);
  return (
    <div>
      haha xd
      <Link
        href="/user?username=burak"
        as={{ pathname: "/@burak", query: "dsfk" }}
        activeClassName="active"
      >
        <a>First Poast</a>
      </Link>
      <Link href="/">
        <a>To index</a>
      </Link>
      <style jsx>
        {`
          .active {
            color: red;
          }
        `}
      </style>
    </div>
  );
};
User.getInitialProps = async (...a): Promise<Props> => {
  console.log(a);
  return { salam: "balam" };
};
export default User;
