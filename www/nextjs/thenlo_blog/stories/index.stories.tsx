import React from "react";

import { storiesOf } from "@storybook/react";

import Link from "../components/Link";

storiesOf("Link", module).add(
  "link component",
  (): JSX.Element => (
    <Link href="/user" prefetch={false}>
      <a>salam xd</a>
    </Link>
  )
);
