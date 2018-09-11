'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    confirmation_code: DataTypes.UUID,
    confirmed: DataTypes.BOOLEAN,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    organizer_alias: DataTypes.STRING,
    email_address: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.TINYINT,
    password: DataTypes.STRING,
    profile_pic: DataTypes.STRING,
    phone_number: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};