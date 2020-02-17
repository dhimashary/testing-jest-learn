'use strict';
const bcryptjs = require('bcryptjs')


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  User.beforeCreate((user, opt) => {
    const salt = bcryptjs.genSaltSync(10)
    user.password = bcryptjs.hashSync(user.password, salt)
  })
  return User;
};