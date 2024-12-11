import { Schema, model } from "mongoose"
const collection = "reviews"

const objectSchema = {
  comment: { type: String },
  rating: {
    type: Number,
    required: [true, "Review must have a rating"],
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5.0"],
  },
  place: {
    type: Schema.Types.ObjectId,
    ref: "places",
    required: [true, "Review must be associated with one place"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Review must be associated with one user"],
  },
}
const options = {
  timestamps: true,
}
const schema = new Schema(objectSchema, options)

const Review = model(collection, schema)

export default Review
