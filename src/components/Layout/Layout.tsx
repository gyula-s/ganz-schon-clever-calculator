import { StaticQuery, graphql } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";
import * as styles from "./layout.module.scss";
import cx from "classnames";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export interface MenuLink {
    name: string;
    link: string;
}

export interface SiteMetadata {
    title: string;
    menuLinks: MenuLink[];
}

export interface Site {
    siteMetadata: SiteMetadata;
}
export interface RootObject {
    site: Site;
}

export const Layout = ({ children }) => (
    <StaticQuery
        query={graphql`
            query SiteTitleQuery {
                site {
                    siteMetadata {
                        title
                        menuLinks {
                            name
                            link
                        }
                    }
                }
            }
        `}
        render={(data: RootObject) => {
            const siteMetaData: SiteMetadata = data.site.siteMetadata;

            return (
                <React.Fragment>
                    <Helmet title={siteMetaData.title}></Helmet>
                    <Header menuLinks={data.site.siteMetadata.menuLinks} />

                    <main className={cx(styles.main)}>{children}</main>
                    <Footer />
                </React.Fragment>
            );
        }}
    />
);

export default Layout;
