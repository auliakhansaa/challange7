"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      History.belongsTo(models.Room, {
        foreignKey: "roomId",
        as: "PlayGame",
      });
    }
    static async gameHistory({ roomId, idWin, idLose }) {
      /*
        #encrypt dari static method
        encryptedPassword akan sama dengan string 
        hasil enkripsi password dari method #encrypt
      */
      return this.create({ roomId, idWin,  idLose});
    }
  }
  History.init(
    {
      roomId: DataTypes.INTEGER,
      idWin: DataTypes.STRING,
      idLose: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "History",
    }
  );
  return History;
};
