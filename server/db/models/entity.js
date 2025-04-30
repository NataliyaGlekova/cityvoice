'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entity extends Model {
    static associate(models) {
      Entity.belongsToMany(models.Marker, {
        through: 'MarkerEntity',
        foreignKey: 'entityId',
        otherKey: 'markerId',
      });
    }
  }
  Entity.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Entity',
      tableName: 'Entities',
    },
  );
  return Entity;
};