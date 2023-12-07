import { DataTypes, Sequelize } from "sequelize";

export const FreeGameModel = (sequelize: Sequelize) => {
    return sequelize.define("FreeGame", {
        nom:{type: DataTypes.STRING},
        description: {type: DataTypes.STRING},
        image: {type: DataTypes.STRING},
    }, {
        timestamps: false
    });
}