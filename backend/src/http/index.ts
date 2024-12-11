import express, { json } from "express"
import cors from "cors"
import api from "../api"
import config from "../config"

const { host, port } = config.http

const app = express()
app.use(cors())
app.use(json())
app.use("/api/v1", api)

const init = () => {
  app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
  })
}

export default init
