import { Router } from "express";
import { User } from "..";
import "dotenv/config"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

const saltRounds = 10;

export const AuthRouter = Router()

AuthRouter.post('/local/register', async (req,res) => { // pour créer un jeu et verifier si le email est déja utilisé
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
        res.json(newUser)
      }
      else {
        res.status(400).json({ message: "utilisateur non créé" })
      }
    }
  })

// const match = await bcrypt.compare(myPlaintextPassword, hash);
  
AuthRouter.post('/local', async (req,res) => { 
    const {identifier, password} = req.body
    const user = await User.findOne({ where: { email: identifier }})

    if(user !== null){
        const match = await bcrypt.compare(req.body.password, user?.dataValues.password);
        if(match){
            const token = jwt.sign({ id: user.dataValues.id }, process.env.JWT_SECRET!)
            res.json({
                message: "ok",
                token
            })
        }
        else{
          res.status(400).json({ message: "non" })
        }
    }
    else {
        res.status(400).json({ message: "l'utilisateur n'existe pas" })
    }
})