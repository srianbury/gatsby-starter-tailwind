import * as React from "react";
import { useContext } from "react";
import { Link } from "gatsby";
import { HeaderPropTypes } from "./index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { NavDrawer, NavDrawerContext } from "../navDrawer";

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
        <h1 className="inline align-middle text-black dark:text-white">
          <Link to="/">{siteTitle}</Link>
        </h1>
      </div>
    </div>
  );
};

LeftTitle.propTypes = HeaderPropTypes;
export { LeftTitle };
