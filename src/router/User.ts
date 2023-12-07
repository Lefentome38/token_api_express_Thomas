import { Router } from "express";
import { User } from "..";
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const UserRouter = Router()

UserRouter.post('/api/auth/local/register', async (req,res) => { // pour créer un jeu et verifier si le email est déja utilisé
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
  })
  
  // const match = await bcrypt.compare(myPlaintextPassword, hash);
  
  // UserRouter.post('/api/auth/local', async (req,res) => { 
  //   const {identifier, password} = req.body
  //   const a = await User.findOne({ where: { email: identifier }})
  //   const match = await bcrypt.compare(password, a.dataValues.password);
    
  //   if(match){
  //     res.json("ok")
  //   }
  //   else{
  //     res.status(400).json({ message: "non" })
  //   }
  // })
  
  UserRouter.get('/api/users/me', async (_,res) => { // pour récupère tout les jeux
    res.json(await User.findAll())
  })