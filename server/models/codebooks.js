'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class codebooks extends Model {}
  codebooks.init(
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
      modelName: 'codebooks',
    }
  );
  return codebooks;
};
