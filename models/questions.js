'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Questions.init({
    question: DataTypes.STRING,
    answers: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Questions',
    underscored: true,
    underscoreAll: true,
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Questions;
};