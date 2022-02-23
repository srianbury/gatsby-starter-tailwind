import * as React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { LayoutContainer } from "../layoutContainer";
import { links } from "../../constants/navigation";
import { HeaderLink } from "./HeaderLink";
import { LeftTitle } from "./LeftTitle";
import { LoginOrUser, OpenLoginModalButton } from "./LoginOrUser";

const Header = ({ siteTitle }) => (
  <header>
    <Box sx={{ borderBottom: 1 }}>
      <LayoutContainer>
        <div className="flex justify-between">
          <LeftTitle siteTitle={siteTitle} />
          <div className="hidden place-self-center md:block">
            {links.map(link => (
              <span key={link.title} className="pl-2">
                <HeaderLink to={link.to} title={link.title} />
              </span>
            ))}
            <span className="pl-2">
              <LoginOrUser />
            </span>
          </div>
        </div>
      </LayoutContainer>
    </Box>
  </header>
);

const HeaderPropTypes = {
  siteTitle: PropTypes.string.isRequired,
};

Header.propTypes = HeaderPropTypes;
export { Header, HeaderPropTypes, OpenLoginModalButton };
