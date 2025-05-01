const jwtConfig = require('./jwtConfig');

const cookieConfig = {
  maxAge: jwtConfig.refresh.expiresIn,
  httpOnly: true,
};

module.exports = cookieConfig;
