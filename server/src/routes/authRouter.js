const AuthController = require('../controllers/AuthController');

const authRouter = require('express').Router();

// authRouter.post('/register', AuthController.signup);
authRouter.get('/refresh', AuthController.refresh);
authRouter.post('/login', AuthController.login);
authRouter.delete('/logout', AuthController.logout);

module.exports = authRouter;
