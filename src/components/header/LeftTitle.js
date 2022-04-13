import * as React from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "gatsby";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavDrawer, NavDrawerContext } from "../NavDrawer";
import { breakpoint } from "./common";

const LeftTitle = ({ siteTitle }) => {
  const { openDrawer } = useContext(NavDrawerContext);

  return (
    <div className={`align-middle ${breakpoint}:block`}>
      <div className={`inline-block align-middle ${breakpoint}:hidden`}>
        <button
          // className="mr-1 p-1 rounded border-2 border-solid border-black"
          className="mr-2 py-1 pr-1"
          onClick={openDrawer}
        >
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <MenuIcon />
          </IconButton>
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
  siteTitle: PropTypes.string.isRequired,
};

export { LeftTitle };
