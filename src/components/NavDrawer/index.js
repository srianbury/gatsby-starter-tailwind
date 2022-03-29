import * as React from "react";
import { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { navigation } from "../../constants";
import { OpenLoginModalButton } from "../Header/OpenLoginModalButton";
import { HeaderLogoutButton } from "../Header/HeaderLogoutButton";

const NavDrawerContext = createContext(false);

const NavDrawerContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  function openDrawer() {
    setOpen(true);
  }

  function closeDrawer() {
    setOpen(false);
  }

  return (
    <NavDrawerContext.Provider
      value={{
        open,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </NavDrawerContext.Provider>
  );
};

const NavDrawer = () => {
  const { open, closeDrawer } = useContext(NavDrawerContext);

  function drawerNavigate(to) {
    navigate(to);
    closeDrawer();
  }

  return (
    <Drawer anchor="left" open={open} onClose={closeDrawer}>
      <Box
        sx={{
          width: 250,
        }}
      >
        <ul className="p-4">
          <li className="pb-4">
            <OpenLoginModalButton />
          </li>
          {navigation.links.map(link => (
            <DrawerNavItem
              key={link.title}
              to={link.to}
              title={link.title}
              drawerNavigate={drawerNavigate}
            />
          ))}
          <li className="pb-4">
            <HeaderLogoutButton />
          </li>
        </ul>
      </Box>
    </Drawer>
  );
};

const DrawerNavItem = ({ to, title, drawerNavigate }) => (
  <li className="cursor-pointer pb-4">
    <button type="button" onClick={() => drawerNavigate(to)}>
      {title}
    </button>
  </li>
);

DrawerNavItem.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  drawerNavigate: PropTypes.func.isRequired,
};

export { NavDrawer, NavDrawerContextProvider, NavDrawerContext };
