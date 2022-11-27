module.exports = {
  db: {
    url:
      process.env.DB_URL ||
      'mongodb+srv://timsblog:test5@cluster0.orbap2f.mongodb.net/blog?retryWrites=true&w=majority',
  },
  api: {
    port: process.env.PORT || 3001,
    url: process.env.API_URL ? `/${process.env.API_URL}` : '/api',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'what33wutcdse',
  },
};
