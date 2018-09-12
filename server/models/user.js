'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    confirmation_code: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    organizer_alias:{
      type: DataTypes.STRING,
      defaultValue: false
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: true
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profile_pic: {
      type: DataTypes.STRING,
      defaultValue: false
    },
    phone_number: {
      type: DataTypes.STRING,
      defaultValue: false
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};