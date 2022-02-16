import * as React from "react";
import { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { gray } from "tailwindcss/colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import { links } from "../constants/navigation";
import { HeaderLogoutButton, OpenLoginModalButton } from "./header/LoginOrUser";

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
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  function drawerNavigate(to) {
    navigate(to);
    closeDrawer();
  }

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={closeDrawer}
      sx={{
        ".MuiDrawer-paper": {
          background: prefersDarkMode ? gray[900] : "white",
        },
      }}
    >
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
          {links.map(link => (
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
    <button
      type="button"
      className="font-bold dark:text-white"
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

export { NavDrawer, NavDrawerContextProvider, NavDrawerContext };
