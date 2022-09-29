import cors from "cors"
import express from "express"
import { router as moviesRouter } from "./routes/movies"
const app = express()
const port = 3000

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use(cors())
app.use("/movies", moviesRouter)

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`)
})
