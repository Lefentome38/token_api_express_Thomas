import { Router } from "express";
import { FreeGame } from "../index";

export const FreeGameRouter = Router();

FreeGameRouter.post('/', async (req,res) => { // créer un jeu
  const {nom, description, image} = req.body.data
  if (nom && description && image) {
    res.json(await FreeGame.create({ nom, description, image }))
  }
  else{
    res.status(400).json({message: "entrer les informations suivante nom|description|image"})
  }
})

FreeGameRouter.get('/', async (_,res) => { // pour récupère tout les jeux
  res.json(await FreeGame.findAll())
})

FreeGameRouter.get('/:id', async (req,res) => { // pour récupère un avce l'index
  const index = await FreeGame.findOne({where: {id: req.params.id}})
  if (index) {
    res.json(await FreeGame.findOne({ where: {id: req.params.id}}))
  }
  else{
    res.status(400).json({message: "élément non trouvé"})
  }
})

FreeGameRouter.put('/:id', async (req,res) => { // pour modifie un jeux avec l'index
  const {nom, description, image} = req.body.data
  const index = await FreeGame.findOne({where: {id: req.params.id}})
  if (index) {
    const a = await FreeGame.update({ nom, description, image, }, { where: {id: req.params.id}})
    res.json(a)
  }
  else{
    res.status(400).json({message: "élément non trouvé"})
  }
})

FreeGameRouter.delete('/:id', async (req,res) => { // supprime l'élément avec l'index 
  const index = await FreeGame.findOne({where: {id: req.params.id}})
  if (index) {
    res.json(await FreeGame.destroy({ where: {id: req.params.id}}))
  }
  else{
    res.status(400).json({message: "élément non trouvé"})
  }
})