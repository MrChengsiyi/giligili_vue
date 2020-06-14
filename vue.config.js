module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  publicPath: './',
  outputDir:'dist',
  assetsDir:'static'
};
