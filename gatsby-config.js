/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    siteUrl: "https://gcs.soos.uk",
    title: "Emergency Board Game Tools",
    menuLinks: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "GSC Calculator",
        link: "/",
      },
      {
        name: "GSC Dice",
        link: "/dice",
      },
      {
        name: "Welcome To cards",
        link: "/welcome",
      },
    ],
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-gatsby-cloud",
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Boogaloo`],
        display: "swap",
      },
    },
  ],
};
