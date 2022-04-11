import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const HeaderLink = ({ to, title }) => <Link to={to}>{title}</Link>;

HeaderLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export { HeaderLink };
