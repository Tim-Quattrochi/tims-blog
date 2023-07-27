module.exports = {
  api: {
    port: process.env.PORT || 3001,
    url: process.env.API_URL ? `/${process.env.API_URL}` : "/api",
  },
  db: {
    connString: process.env.DB_URL || "mongodb://localhost:27017",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "dancingduck",
    expiresIn: process.env.JWT_EXPIRES_IN || "3d",
  },
};
