import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const HeaderLink = ({ to, title }) => (
  <span className="pl-2 font-bold">
    <Link to={to}>{title}</Link>
  </span>
);

HeaderLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export { HeaderLink };
