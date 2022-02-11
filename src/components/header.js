import * as React from "react";
import { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { useAuthenticator } from "@aws-amplify/ui-react";
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

const LoginOrUser = () => {
  const { user, signOut } = useAuthenticator(context => [context.user]);

  return (
    <span className="pl-2 font-bold">
      {user ? (
        <HeaderLogoutButton {...{ user, signOut }} />
      ) : (
        <Link to="/login">Login</Link>
      )}
    </span>
  );
};

const HeaderLogoutButton = ({ user, signOut }) => (
  <button type="button" onClick={signOut} className="font-bold">
    {`${user.username}: Sign Out`}
  </button>
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
    <div className="align-middle md:block">
      <div className="inline align-middle md:hidden">
        <button
          // className="mr-1 p-1 rounded border-2 border-solid border-black"
          className="mr-2 py-1 pr-1"
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
