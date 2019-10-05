/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Link from ".";

describe("www:nextjs:thenlo:components:Link", (): void => {
  it("renders the link with correct a tag", (): void => {
    const wrapper = shallow(
      <Link href="/user">
        <a>To User</a>
      </Link>
    );
    expect(wrapper.find("a").text()).toEqual("To User");
  });
  it("render link with snapshot", (): void => {
    const component = renderer.create(
      <Link href="/user">
        <a>To User</a>
      </Link>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
