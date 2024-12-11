import dotenv from "dotenv"

dotenv.config()

const config = {
  http: {
    host: process.env.HTTP_HOST || "0.0.0.0",
    port: process.env.PORT || process.env.HTTP_PORT,
  },
  jwtKey: process.env.JWTKEY,
  database: {
    connectionString: process.env.DB_CONNECTION_STRING,
  },
  saltRounds: parseInt(process.env.SALT_ROUNDS as string, 10),
}

if (!config.jwtKey || !config.database.connectionString || !config.saltRounds || !config.http.host || !config.http.port) {
  throw new Error("Missing environment variables")
}

export default config
