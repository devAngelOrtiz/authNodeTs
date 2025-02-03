require("dotenv").config();

module.exports = {
  development: {
    url: process.env.AWS_CONNECTION_STRING,
    dialect: "postgres",
  }
};