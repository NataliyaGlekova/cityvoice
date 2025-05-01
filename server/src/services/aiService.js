const OpenAI = require('openai');

require('dotenv').config();

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.API_KEY_DEEPSEEK,
});

class AiService {
  static async generateText(prompt) {
    const comletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'deepseek-chat',
    });
    console.log(comletion);

    return comletion.choices[0].message.content;
  }
}

module.exports = AiService;
