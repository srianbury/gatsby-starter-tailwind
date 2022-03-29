import * as React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { LayoutContainer } from "../LayoutContainer";
import { navigation } from "../../constants";
import { HeaderLink } from "./HeaderLink";
import { LeftTitle } from "./LeftTitle";
import { OpenLoginModalButton } from "./OpenLoginModalButton";
import { HeaderLogoutButton } from "./HeaderLogoutButton";

const Header = ({ siteTitle }) => (
  <header>
    <Box sx={{ borderBottom: 1 }}>
      <LayoutContainer>
        <div className="flex justify-between">
          <LeftTitle siteTitle={siteTitle} />
          <div className="hidden place-self-center md:block">
            {navigation.links.map(link => (
              <span key={link.title} className="pl-2">
                <HeaderLink to={link.to} title={link.title} />
              </span>
            ))}
            <span className="pl-2">
              <HeaderLogoutButton />
              <OpenLoginModalButton />
            </span>
          </div>
        </div>
      </LayoutContainer>
    </Box>
  </header>
);
Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

export { Header };
