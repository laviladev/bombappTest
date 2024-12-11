import { connect, connection } from "mongoose"
import config from "../config"

const { connectionString } = config.database as { connectionString: string }

export const init = async () => {
  try {
    await connect(connectionString)
    console.log("Connected to the database sucessfully!")
  } catch (err) {
    console.error(
      `Error connecting to database ->`,
      `Error code: ${err.code}, error reference: ${err.codeName}, message: ${err.message}`,
    )
  }
}

export const disconnect = () => {
  connection.close()
}
