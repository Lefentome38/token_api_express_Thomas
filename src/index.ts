console.log("hello");

import express from 'express'
import "dotenv/config"

const app = express();
const PORT = process.env.PORT as string;

app.get('/helloo', (_, res) => {
    console.log("hello les toutous");
    res.send("ok")
})

app.listen( parseInt(PORT), () =>
  console.log("Server is listening on port " + PORT + "...")
);