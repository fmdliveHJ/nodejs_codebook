'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Codebook extends Model {}
  Codebook.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ko: DataTypes.STRING,
      en: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Codebook',
    }
  );
  return Codebook;
};
