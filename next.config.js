if (process.env.NODE_ENV === 'export') {
  module.exports = {
    assetPrefix: '/MyCodeTools',
    exportTrailingSlash: true,
    exportPathMap() {
      return {
        '/': { page: '/' },
      };
    },
  };
}
