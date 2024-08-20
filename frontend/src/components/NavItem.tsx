import React from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
  routeName: string;
  path: string;
}

const NavItem: React.FC<NavItemProps> = ({ routeName, path }) => {
  return (
    <li>
      <Link to={path}>{routeName}</Link>
    </li>
  );
};

export default NavItem;
