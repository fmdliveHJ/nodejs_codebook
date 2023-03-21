'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coodbookr extends Model {}
  Coodbookr.init(
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
      modelName: 'Coodbookr',
    }
  );
  return Coodbookr;
};
