import * as React from "react";
import PropTypes from "prop-types";
import { LayoutContainer } from "../layoutContainer";
import { links } from "../../constants/navigation";
import { HeaderLink } from "./HeaderLink";
import { LeftTitle } from "./LeftTitle";
import { LoginOrUser } from "./LoginOrUser";
import { darkModeTheme } from "../../styles";

const Header = ({ siteTitle }) => (
  <header
    className={`${darkModeTheme} border-b-2 border-black dark:border-white`}
  >
    <LayoutContainer>
      <div className="flex justify-between">
        <LeftTitle siteTitle={siteTitle} />
        <div className="hidden place-self-center md:block">
          {links.map(link => (
            <span key={link.title} className="pl-2 font-bold">
              <HeaderLink to={link.to} title={link.title} />
            </span>
          ))}
          <span className="pl-2 font-bold">
            <LoginOrUser />
          </span>
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
