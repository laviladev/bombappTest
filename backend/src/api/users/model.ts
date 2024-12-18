import mongoose from "mongoose"
import bcrypt from "@node-rs/bcrypt"
import config from "../../config"

const collection = "users"
const objectSchema = {
  name: { type: String, required: true },
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: { type: String, required: true },
  active: { type: Boolean, required: true, default: true },
  role: { type: String, required: true, default: "registered" },
}
const options = {
  timestamps: true,
}
const schema = new mongoose.Schema(objectSchema, options)

schema.pre("save", function (next) {
  const salt = bcrypt.genSaltSync(config.saltRounds)
  const passwordHash = bcrypt.hashSync(this.password, 5, salt)
  this.password = passwordHash
  next()
})

const User = mongoose.model(collection, schema)

export default User
