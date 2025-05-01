const jwt = require('jsonwebtoken');
const generateTokens = require('../utils/generateTokens');
require('dotenv').config();
const { User } = require('../../db/models/');
const bcrypt = require('bcrypt');
const cookieConfig = require('../Config/cookieConfig');

class AuthController {
  static async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const { accessToken, refreshToken: newRefreshToken } = generateTokens({ user });
      return res
        .status(200)
        .cookie('refreshToken', newRefreshToken, cookieConfig)
        .json({ user, accessToken });
    } catch (error) {
      if (error.message === 'Unauthorized') {
        return res.status(401).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { login, password } = req.body;
      const targetUser = await User.findOne({ where: { login } });
      if (!targetUser)
        return res.status(400).json({ message: 'Пользователь не зарегистрирован' });
      const isPasswordCorrect = await bcrypt.compare(password, targetUser.hashedPass);
      if (!isPasswordCorrect) return res.status(400).json({ message: 'Неверный пароль' });
      const user = targetUser.get();
      delete user.hashedPass;
      const { accessToken, refreshToken } = generateTokens({ user });
      return res
        .status(200)
        .cookie('refreshToken', refreshToken, cookieConfig)
        .json({ user, accessToken });
    } catch (error) {
      console.error('Ошибка получения refresh token\n', error);
      return res.status(401).json({ message: 'Ошибка авторизации' });
    }
  }

  // static async signup(req, res) {
  //   try {
  //     const { name, email, password } = req.body;
  //     const hashedPass = await bcrypt.hash(password, 10);
  //     const [newUser, created] = await User.findOrCreate({
  //       where: { email },
  //       defaults: { name, hashedPass },
  //     });
  //     if (!created)
  //       return res.status(401).json({ message: 'Почта уже зарегистрирована' });

  //     const user = newUser.get();
  //     delete user.hashedPass;
  //     const { accessToken, refreshToken } = generateTokens({ user });
  //     return res
  //       .status(200)
  //       .cookie('refreshToken', refreshToken, cookieConfig)
  //       .json({ user, accessToken });
  //   } catch (error) {
  //     console.error('Ошибка регистрации\n', error);
  //     return res.status(500).json({ message: 'Ошибка регистрации' });
  //   }
  // }

  static async logout(req, res) {
    try {
      res.status(200).clearCookie('refreshToken').end();
    } catch (error) {
      console.error('Ошибка деавторизации\n', error);
      res.status(500).json('Ошибка деавторизации');
    }
  }
}

module.exports = AuthController;
