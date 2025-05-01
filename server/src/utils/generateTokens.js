require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtConfig = require('../Config/jwtConfig');

function generateTokens(payload) {
  return {
    refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, jwtConfig.refresh),
    accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, jwtConfig.access),
  };
}

module.exports = generateTokens;
