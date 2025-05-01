const AiService = require('../services/aiService');

class AiController {
  static async getResponse(req, res) {
    try {
      const response = await AiService.generateText(req.body.prompt);
      res.json(response);
    } catch (error) {
      console.error('Error processing AI request:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
module.exports = AiController;
