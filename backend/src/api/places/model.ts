import { Schema, model } from "mongoose"
const collection = "places"

const pointSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
})

const objectSchema = {
  name: { type: String, required: true },
  description: { type: String },
  type: {
    type: Schema.Types.ObjectId,
    ref: "places-types",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  location: {
    type: pointSchema,
    required: true,
  },
}
const options = {
  timestamps: true,
}

const schema = new Schema(objectSchema, options)

const Place = model(collection, schema)

export default Place
