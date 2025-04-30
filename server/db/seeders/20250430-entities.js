'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Entities', [
      {
        id: 1,
        name: 'Новый Иерусалим',
        description:
          'Концепция Нового Иерусалима была разработана патриархом Никоном в XVII веке. Он стремился воссоздать святые места Палестины на территории Подмосковья, чтобы верующие могли совершать паломничество, не покидая Россию. Воскресенский Ново-Иерусалимский монастырь стал центральным элементом этого проекта.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Никон',
        description:
          'Никон (1605–1681) — патриарх Московский и всея Руси, инициатор церковных реформ в XVII веке. Основал Воскресенский Ново-Иерусалимский монастырь, чтобы воплотить идею Нового Иерусалима. Его реформы вызвали раскол в Русской православной церкви.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Истра',
        description:
          'Река Истра, переименованная в Иордан в рамках проекта Нового Иерусалима, протекает через город Истру. Она играет ключевую роль в ландшафте и символике Воскресенского Ново-Иерусалимского монастыря.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: 'Чехов',
        description:
          'Антон Павлович Чехов (1860–1904) — выдающийся русский писатель и драматург. Работал врачом в Воскресенске (ныне Истра) в 1880-х годах. В его честь установлен памятник около Истринского драматического театра.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('MarkerEntity', [
      // Воскресенский Ново-Иерусалимский монастырь
      { markerId: 1, entityId: 1, createdAt: new Date(), updatedAt: new Date() }, // Новый Иерусалим
      { markerId: 1, entityId: 2, createdAt: new Date(), updatedAt: new Date() }, // Никон
      { markerId: 1, entityId: 3, createdAt: new Date(), updatedAt: new Date() }, // Истра
      // Смотровая площадка
      { markerId: 2, entityId: 1, createdAt: new Date(), updatedAt: new Date() }, // Новый Иерусалим
      { markerId: 2, entityId: 3, createdAt: new Date(), updatedAt: new Date() }, // Истра
      // Истринский городской парк
      { markerId: 3, entityId: 1, createdAt: new Date(), updatedAt: new Date() }, // Новый Иерусалим
      { markerId: 3, entityId: 3, createdAt: new Date(), updatedAt: new Date() }, // Истра
      // Памятник А.П. Чехову
      { markerId: 4, entityId: 4, createdAt: new Date(), updatedAt: new Date() }, // Чехов
      // Государственный историко-художественный музей
      { markerId: 5, entityId: 1, createdAt: new Date(), updatedAt: new Date() }, // Новый Иерусалим
      { markerId: 5, entityId: 2, createdAt: new Date(), updatedAt: new Date() }, // Никон
      // Выставка старых автомобилей
      { markerId: 8, entityId: 1, createdAt: new Date(), updatedAt: new Date() }, // Новый Иерусалим
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MarkerEntity', null, {});
    await queryInterface.bulkDelete('Entities', null, {});
  },
};