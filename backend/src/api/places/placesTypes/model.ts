import { Schema, model } from "mongoose"
const collection = "places-types"

const objectSchema = {
  name: { type: String, required: true, unique: true },
  description: { type: String },
}
const options = {
  timestamps: true,
}
const schema = new Schema(objectSchema, options)

const PlaceType = model(collection, schema)

export default PlaceType
