import * as React from "react";
import PropTypes from "prop-types";
import { LayoutContainer } from "../layoutContainer";
import { links } from "../../constants/navigation";
import { HeaderLink } from "./HeaderLink";
import { LeftTitle } from "./LeftTitle";
import { LoginOrUser } from "./LoginOrUser";

const Header = ({ siteTitle }) => (
  <header className="bg-purple-500">
    <LayoutContainer>
      <div className="flex justify-between">
        <LeftTitle siteTitle={siteTitle} />
        <div className="hidden place-self-center md:block">
          {links.map(link => (
            <HeaderLink key={link.title} to={link.to} title={link.title} />
          ))}
          <LoginOrUser />
        </div>
      </div>
    </LayoutContainer>
  </header>
);

const HeaderPropTypes = {
  siteTitle: PropTypes.string.isRequired,
};

Header.propTypes = HeaderPropTypes;
export { Header, HeaderPropTypes };
