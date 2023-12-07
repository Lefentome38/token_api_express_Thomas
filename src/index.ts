import { Sequelize} from "sequelize"
import cors from "cors"
import bodyParser from "body-parser"
import express, { NextFunction, Request, Response } from 'express'
import "dotenv/config"

import { FreeGameModel } from "./model/FreeGame" // la table
import { OfficialGameModel } from "./model/OfficialGale"
import { UserModel } from "./model/User"

import { FreeGameRouter} from "./router/FreeGame" // les routes
import { OfficialGamesRouter } from "./router/OfficialGame"
import { AuthRouter } from "./router/Auth"
import { UserRouter } from "./router/User"

const app = express();
const PORT = process.env.PORT as string;
app.use(cors())
app.use(bodyParser.json())

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./BDD.sqlite",
})

export const FreeGame = FreeGameModel(sequelize);
export const OfficialGames = OfficialGameModel(sequelize)
export const User = UserModel(sequelize)

sequelize
// .sync({ force: true })
.sync()
.catch(error => {
console.error('Erreur de synchronisation', error)
})

export async function checkToken(req: Request, res: Response, next: NextFunction){
  const authorization = req.headers.authorization
  console.log('authorization', authorization)
  if (!authorization) {
    res.status(401).send("No")
  }
  else{
    next();
  }
}

const apiRouter = express.Router();
apiRouter.use('/free-games',FreeGameRouter )
apiRouter.use('/official-games', OfficialGamesRouter )
apiRouter.use('/auth', AuthRouter)
apiRouter.use('/users', UserRouter)

app.use('/api', apiRouter)

app.listen( parseInt(PORT), () =>
  console.log("Server is listening on port " + PORT + "...")
);