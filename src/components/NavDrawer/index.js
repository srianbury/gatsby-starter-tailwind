import * as React from "react";
import { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { navigation } from "../../constants";
import {
  HeaderLogoutButton,
  OpenLoginModalButton,
} from "../Header/LoginOrUser";

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
  const { route } = useAuthenticator(context => [context.route]);

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
          {route !== "authenticated" ? (
            <li className="pb-4">
              <OpenLoginModalButton />
            </li>
          ) : null}
          {navigation.links.map(link => (
            <DrawerNavItem
              key={link.title}
              to={link.to}
              title={link.title}
              drawerNavigate={drawerNavigate}
            />
          ))}
          {route === "authenticated" ? (
            <li className="pb-4">
              <HeaderLogoutButton />
            </li>
          ) : null}
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
