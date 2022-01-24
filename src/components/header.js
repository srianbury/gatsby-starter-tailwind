import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link, navigate } from "gatsby";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { LayoutContainer } from "./layoutContainer";

const links = [
  { title: "Home", to: "/" },
  { title: "About", to: "/about" },
];

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
            <HeaderLink to={link.to} title={link.title} />
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
  const [open, setOpen] = useState(false);

  function closeDrawer() {
    setOpen(false);
  }

  function drawerNavigate(to) {
    navigate(to);
    closeDrawer();
  }

  return (
    <div className="md:block align-middle">
      <div className="md:hidden inline align-middle">
        <button
          // className="mr-1 p-1 rounded border-2 border-solid border-black"
          className="mr-2 pr-1 py-1"
          onClick={() => setOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        <Drawer anchor="left" open={open} onClose={closeDrawer}>
          <Box
            sx={{
              width: 250,
            }}
          >
            <ul className="p-4">
              {links.map(link => (
                <DrawerNavItem
                  to={link.to}
                  title={link.title}
                  drawerNavigate={drawerNavigate}
                />
              ))}
            </ul>
          </Box>
        </Drawer>
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

const DrawerNavItem = ({ to, title, drawerNavigate }) => (
  <li className="cursor-pointer pb-4">
    <button
      type="button"
      className="font-bold"
      onClick={() => drawerNavigate(to)}
    >
      {title}
    </button>
  </li>
);

DrawerNavItem.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  drawerNavigate: PropTypes.func.isRequired,
};

export default Header;
