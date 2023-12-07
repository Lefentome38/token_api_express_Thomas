import { Router } from "express";
import { User, checkToken } from "..";

export const UserRouter = Router()

UserRouter.get('/me', (req, res, next) => checkToken(req, res, next), async (req,res) => { // pour récupère tout les jeux
  res.json({ coucou: 'fsjs'})
})