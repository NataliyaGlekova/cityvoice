const jwt = require('jsonwebtoken');
require('dotenv').config();

// function verifyRefreshToken(req, res, next) {
//   try {
//     const { refreshToken } = req.cookies;
//     const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//     return next();
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({ message: 'Ошибка аутентификации' });
//   }
// }

function verifyAccessToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.split(' ')[1];
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    res.locals.user = user;
    return next();
  } catch (error) {
    console.error('Неверный access token\n', error);
    return res.sendStatus(403);
  }
}

module.exports = verifyAccessToken;
