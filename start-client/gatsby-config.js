const isDev = process.env.NODE_ENV === 'development'

const siteMetadata = {
  title: `Axon Initializr`,
  description: `Initializr generates spring boot project with just what you need to start quickly!`,
  twitter: `@axonframework`,
  canonical: `https://axon-initializr.cfapps.io`,
  author: `@axonframework`,
  image: `https://github.com/AxonFramework/AxonFramework/blob/f48c004c6b5b8e7db9a0c876e0b86af1b0f55328/documentation/src/main/resources/images/logo.png?raw=true`,
  apiUrl: isDev ? `/api.json` : `/metadata/client`,
  apiZip: `/starter.zip`,
}

const plugins = [
  {
    resolve: 'gatsby-plugin-webpack-bundle-analyzer',
    options: {
      analyzerPort: 3000,
      production: true,
      openAnalyzer: false,
    },
  },
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images/`,
    },
  },
  {
    resolve: `gatsby-plugin-prefetch-google-fonts`,
    options: {
      fonts: [
        {
          family: `Karla`,
          variants: [`400`, `700`],
        },
      ],
    },
  },
  `gatsby-transformer-json`,
  `gatsby-plugin-sass`,
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `initializr`,
      short_name: `start`,
      start_url: `/`,
      background_color: `#6db33f`,
      theme_color: `#6db33f`,
      display: `minimal-ui`,
      icon: `src/images/initializr-icon.png`,
    },
  },
]

if (process.env.GOOGLE_TAGMANAGER_ID) {
  plugins.push({
    resolve: `gatsby-plugin-google-tagmanager`,
    options: {
      id: `${process.env.GOOGLE_TAGMANAGER_ID}`,
    },
  })
}

module.exports = {
  siteMetadata,
  plugins,
}
