import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import React, { ReactElement, SFC } from "react";

interface Props {
  children: ReactElement;
  activeClassName?: string;
}

const EnhancedLink: SFC<Props & LinkProps> = ({
  children,
  ...props
}): JSX.Element => {
  const child = React.Children.only(children);
  const router = useRouter();
  const { href, activeClassName } = props;

  let className = child.props.className || null;
  if (
    router &&
    router.pathname ===
      (typeof href !== "string" ? href.pathname : href.split("?")[0]) &&
    activeClassName
  ) {
    className = `${className || ""} ${activeClassName}`.trim();
  }

  // eslint-disable-next-line no-param-reassign
  delete props.activeClassName;

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default EnhancedLink;
