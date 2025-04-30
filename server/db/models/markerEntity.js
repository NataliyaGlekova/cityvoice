'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MarkerEntity extends Model {}
  MarkerEntity.init(
    {
      markerId: {
        type: DataTypes.INTEGER,
        references: { model: 'Markers', key: 'id' },
        primaryKey: true,
      },
      entityId: {
        type: DataTypes.INTEGER,
        references: { model: 'Entities', key: 'id' },
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: 'MarkerEntity',
      tableName: 'MarkerEntity',
    },
  );
  return MarkerEntity;
};