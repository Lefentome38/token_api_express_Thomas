import { DataTypes, Sequelize } from "sequelize";

export const OfficialGameModel = (sequelize: Sequelize) => {
  return sequelize.define("OfficialGames", {
    nom: {type: DataTypes.STRING,},
    description: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING},
    prix: {type: DataTypes.STRING}
  }, {
    timestamps: false
  })
}