'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Marker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Marker.hasMany(models.Comment, { foreignKey: 'markerId' });
      Marker.belongsToMany(models.Entity, {
        through: 'MarkerEntity',
        foreignKey: 'markerId',
        otherKey: 'entityId',
      });
    }
  }
  Marker.init(
    {
      category: DataTypes.STRING,
      lat: DataTypes.FLOAT,
      lon: DataTypes.FLOAT,
      name: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      description: DataTypes.TEXT,
      rating: DataTypes.INTEGER,
      location: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Marker',
      tableName: 'Markers',
    },
  );
  return Marker;
};
