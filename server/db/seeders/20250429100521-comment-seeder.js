'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const comments = [];
    const names = ['Алексей', 'Мария', 'Иван', 'Елена', 'Дмитрий', 'Ольга'];
    const texts = [
      'Отличное место!',
      'Были здесь недавно',
      'Не понравилось',
      'Рекомендую',
      'Переоценено',
      'Стоит посетить',
    ];

    // Генерация 30 комментариев (6 на каждый из 5 маркеров)
    for (let markerId = 1; markerId <= 5; markerId++) {
      for (let i = 0; i < 6; i++) {
        comments.push({
          text: texts[Math.floor(Math.random() * texts.length)],
          name: names[Math.floor(Math.random() * names.length)],
          markerId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert('Comments', comments);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Comments', null, {});
  },
};
