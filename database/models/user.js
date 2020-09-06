"use strict";

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_login: {
        type: DataTypes.DATE
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active"
      }
    },
    {}
  );
  user.associate = function(models) {
    // associations can be defined here
  };

  return user;
};
