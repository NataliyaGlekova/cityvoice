const express = require('express');
const AiController = require('../controllers/AiController');
const aiRouter = express.Router();

aiRouter.post('/', AiController.getResponse);

module.exports = aiRouter;
