const Sequelize = require('sequelize');
const config = require('../config/config.json');

const { username, password, database, host, dialect } = config.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});
//Member 모델은 Members 테이블과 연동
const Member = require('./codebooks')(sequelize, Sequelize.DataTypes);

const db = {};
db.Member = Member;

module.exports = db;
