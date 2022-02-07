import * as React from "react";
import { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { LayoutContainer } from "./layoutContainer";
import { links } from "../constants/navigation";
import { NavDrawer, NavDrawerContext } from "./navDrawer";

const HeaderLink = ({ to, title }) => (
  <span className="pl-2 font-bold">
    <Link to={to}>{title}</Link>
  </span>
);

HeaderLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const Header = ({ siteTitle }) => (
  <header className="bg-purple-500">
    <LayoutContainer>
      <div className="flex justify-between">
        <LeftTitle siteTitle={siteTitle} />
        <div className="hidden md:block place-self-center">
          {links.map(link => (
            <HeaderLink key={link.title} to={link.to} title={link.title} />
          ))}
        </div>
      </div>
    </LayoutContainer>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

const LeftTitle = ({ siteTitle }) => {
  const { openDrawer } = useContext(NavDrawerContext);

  return (
    <div className="md:block align-middle">
      <div className="md:hidden inline align-middle">
        <button
          // className="mr-1 p-1 rounded border-2 border-solid border-black"
          className="mr-2 pr-1 py-1"
          onClick={openDrawer}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        <NavDrawer />
      </div>
      <div className="inline">
        <h1 className="inline align-middle">
          <Link to="/">{siteTitle}</Link>
        </h1>
      </div>
    </div>
  );
};

LeftTitle.propTypes = {
  ...Header.propTypes,
};

LeftTitle.defaultProps = {
  ...Header.defaultProps,
};

export default Header;
