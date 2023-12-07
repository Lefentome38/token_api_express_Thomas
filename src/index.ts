import { DataTypes, Sequelize, where} from "sequelize"
import cors from "cors"
import bodyParser from "body-parser"
import express from 'express'
import "dotenv/config"
import bcrypt from 'bcrypt';
import { userInfo } from "os"

const saltRounds = 10;

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

const OfficialGames = sequelize.define("OfficialGames", {
  nom: {type: DataTypes.STRING,},
  description: {type: DataTypes.STRING},
  image: {type: DataTypes.STRING},
  prix: {type: DataTypes.STRING}
}, {
  timestamps: false
})

const User = sequelize.define("User", {
  username: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING},
  password: {type: DataTypes.STRING}
}, {
  timestamps: false
})

sequelize
.sync()
.catch(error => {
console.error('Erreur de synchronisation', error)
})

// -------------------------------------------------------------------FreeGame-------------------------------------------------------------------

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

app.put('/api/free-games/:id', async (req,res) => { // pour modifie un jeux avec l'index
  const {nom, description, image} = req.body.data
  const a = await FreeGame.update({ nom, description, image, }, { where: {id: req.params.id}})
  res.json(a)
})

app.delete('/api/free-games/:id', async (req,res) => { // supprime l'élément avec l'index 
  res.json(await FreeGame.destroy({ where: {id: req.params.id}}))
})

// -------------------------------------------------------------------User-------------------------------------------------------------------



app.post('/api/auth/local/register', async (req,res) => { // pour créer un jeu
  let {email,username, password} = req.body
  const userWithEmail = await User.findOne({ where : { email: email }})
  
  if(userWithEmail){
    res.status(400).json({ message: "L'email est déjà pris"})
  }
  else {
    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({email, password: hash, username})

    if(newUser){
      delete newUser.dataValues.password

      res.status(200).json(newUser)
    }
    else {
      res.status(400).json({ message: "utilisateur non créé" })
    }
  }

  // const a = await User.create({username,email,password})
})

app.get('/api/auth/local', async (req,res) => { 
  const {identifier, password} = req.body

  // const a = await User.findOne({ where: { password: password }})
  // const match = await bcrypt.compare(myPlaintextPassword, hash);
  // const match = await bcrypt.compare(password, a);

  if(password)
  res.json("ok")
})

app.get('/api/users/me', async (_,res) => { // pour récupère tout les jeux
  res.json(await User.findAll())
})

// ------------------------------------------------------------------OfficialGames--------------------------------------------------------------------

app.post('/api/official-games', async (req,res) => { // pour créer un jeu
  const {nom, description, image, prix} = req.body.data
  const a = await OfficialGames.create({nom,description,image,prix})
  res.json(a)
})

app.get('/api/official-games', async (_,res) => { // pour récupère tout les jeux
  res.json(await OfficialGames.findAll())
})

// --------------------------------------------------------------------------------------------------------------------------------------


app.get('/helloo', (_, res) => {
    console.log("hello les toutous");
    res.send("ok")
})

app.listen( parseInt(PORT), () =>
  console.log("Server is listening on port " + PORT + "...")
);