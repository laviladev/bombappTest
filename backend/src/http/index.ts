import HyperExpress from 'hyper-express'

// Crear instancia del servidor
import cors from "cors"
import api from "../api"
import config from "../config"

const { host, port } = config.http

const app = new HyperExpress.Server()
app.use(cors())
app.use("/api/v1", api)

// console.log("Routes:", app.routes) // Imprimir las rutas de la app

const init = () => {
// Manejo de errores
  app.set_error_handler((req, res, error) => {
    console.error('Error:', error)
    res.status(500).json({ message: 'Something went wrong!' })
  })

  // Escuchar en el puerto 3000

  app.listen(port, host)
    .then(() => console.log(`Server is running on http://${host}:${port}`))
    .catch(err => console.error('Failed to start server:', err))
}


export default init
