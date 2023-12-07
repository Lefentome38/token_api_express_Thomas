import { Router } from "express";
import { OfficialGames } from "../index";

export const OfficialGamesRouter = Router();

OfficialGamesRouter.post('/', async (req,res) => { // pour créer un jeu
  const {nom, description, image, prix} = req.body.data
  if (nom && description && image && prix) {
    res.json(await OfficialGames.create({ nom, description, image, prix}))
  }
  else{
    res.status(400).json({message: "entrer les informations suivante nom|description|image|prix"})
  }
})

OfficialGamesRouter.get('/', async (_,res) => { // pour récupère tout les jeux
  res.json(await OfficialGames.findAll())
})
  