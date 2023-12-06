console.log("hello");

import { DataTypes, Sequelize, where} from "sequelize"
import cors from "cors"
import bodyParser from "body-parser"
import express from 'express'
import "dotenv/config"
import { freemem } from "os";

const app = express();
const PORT = process.env.PORT as string;
app.use(cors())
app.use(bodyParser.json())

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./BDD.sqlite",
})

const FreeGame = sequelize.define("FreeGame", {
    nom: {type: DataTypes.STRING,},
    description: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING},
  }, {
    timestamps: false
})
sequelize
.sync()
.catch(error => {
  console.error('Erreur de synchronisation', error)
})

app.post('/api/free-games', async (req,res) => { // pour créer un jeu 
  const {nom, description, image} = req.body.data
  const a = await FreeGame.create({ nom, description, image })
  res.json(a)
})

app.get('/api/free-games', async (req,res) => { // pour récupère tout les jeux
  res.json(await FreeGame.findAll())
})

app.get('/api/free-games/:id', async (req,res) => { // pour récupère un avce l'index
  res.json(await FreeGame.findAll({ where: {id: req.params.id}}))
})

app.put('/api/free-games/:id', async (req,res) => { // pour récupère un avce l'index
  const {nom, description, image} = req.body.data
  const a = await FreeGame.update({ nom, description, image, }, { where: {id: req.params.id}})
  res.json(a)
})



app.get('/helloo', (_, res) => {
    console.log("hello les toutous");
    res.send("ok")
})

app.listen( parseInt(PORT), () =>
  console.log("Server is listening on port " + PORT + "...")
);