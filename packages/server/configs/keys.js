module.exports = {
  api: {
    port: process.env.PORT || 3001,
    url: process.env.API_URL ? `/${process.env.API_URL}` : '/api',
  },
};
