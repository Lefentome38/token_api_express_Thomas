console.log("hello");

import { DataTypes, Sequelize} from "sequelize"
import cors from "cors"
import bodyParser from "body-parser"
import express from 'express'
import "dotenv/config"

const app = express();
const PORT = process.env.PORT as string;
app.use(cors())
app.use(bodyParser.json())

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./BDD.sqlite",
})

const FreeGame = sequelize.define("FreeGame", {
  nom: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
}, {
  timestamps: false
})
sequelize
.sync()
.catch(error => {
  console.error('Erreur de synchronisation', error)
})



app.get('/aaa', async (req, res) =>{
  res.json("la liste de la recette: " + " " + req.body.nom + " " + req.body.image)
})

app.post('/test', async (req,res) => {
  const test = await FreeGame.create({
    nom: req.body.nom,
    description: req.body.description,
    image: req.body.image 
  })
  res.json(test)
})



app.get('/helloo', (_, res) => {
    console.log("hello les toutous");
    res.send("ok")
})

app.listen( parseInt(PORT), () =>
  console.log("Server is listening on port " + PORT + "...")
);