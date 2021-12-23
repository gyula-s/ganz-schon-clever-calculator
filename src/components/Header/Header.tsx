import React from "react";
import * as styles from "./header.module.scss";
import cx from "classnames";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import { MenuLink } from "../Layout/Layout";

export const Header = ({ menuLinks }: { menuLinks: MenuLink[] }) => (
    <header className={cx(styles.header)}>
        <nav className={cx(styles.nav)}>
            <ul className={cx(styles.menuList)}>
                {menuLinks.map((link) => (
                    <li className={cx(styles.link)} key={link.name}>
                        <Link to={link.link}>{link.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    </header>
);
Header.propTypes = {
    siteTitle: PropTypes.string,
};
Header.defaultProps = {
    siteTitle: ``,
};
export default Header;
