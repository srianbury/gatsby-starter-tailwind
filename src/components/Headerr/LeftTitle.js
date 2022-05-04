import * as React from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "gatsby";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavDrawer, NavDrawerContext } from "../NavDrawer";

const LeftTitle = ({ siteTitle }) => {
  const { openDrawer } = useContext(NavDrawerContext);

  return (
    <div className={`align-middle md:block`}>
      <div className={`inline align-middle md:hidden`}>
        <IconButton
          sx={{ mr: 2, py: 1, pr: 1 }}
          type="submit"
          aria-label="search"
          onClick={openDrawer}
        >
          <MenuIcon />
        </IconButton>
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
  siteTitle: PropTypes.string.isRequired,
};

export { LeftTitle };
