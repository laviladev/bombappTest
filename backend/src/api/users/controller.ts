import User from "./model"
import { compare } from "@node-rs/bcrypt"
import { sign } from "jsonwebtoken"
import config from "../../config"
import { findUserByUsername } from "../services/userService"

export const list = async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  const skip = (page - 1) * limit

  User.find({ active: true }, ["name", "username", "createdAt", "updatedAt"])
    .limit(Number(limit))
    .skip(skip)
    .sort({ createdAt: -1 })
    .then(async (users) => {
      const total = await User.estimatedDocumentCount()
      const totalPages = Math.ceil(total / limit)
      const hasMore = page < totalPages

      res.status(200).json({
        hasMore,
        totalPages,
        total,
        data: users,
        currentPage: page,
      })
    })
}

export const get = async (req, res) => {
  const user = await findUserByUsername(req.params.username)
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404).json({ message: "User Not Found" })
  }
}

export const create = async (req, res) => {
  const { name, username, password } = req.body
  const userFound = await findUserByUsername(username)
  if (!userFound) {
    const user = {
      name: name,
      password,
      username,
    }

    const newUser = new User(user)
    newUser.save().then((createdUser) => {
      res.status(200).json({ createdObject: createdUser })
    })
  } else {
    res.status(400).json({ message: "username already exits" })
  }
}

export const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(400).json({ message: "errors.user.usernameOrPasswordEmpty" })
  }
  const foundUser = await User.findOne({ username })
  if (foundUser) {
    const userId = foundUser._id
    const result = await compare(password, foundUser.password)
    if (result) {
      const token = sign({ userId }, config.jwtKey as string)
      const cookieProps = {
        maxAge: 60 * 60 * 24 * 1000,
      }

      return res
        .status(200)
        .cookie("token", token, cookieProps)
        .json({
          data: {
            username: foundUser.username,
            name: foundUser.name,
            token: token,
          },
          message: "ok",
        })
    } else {
      res.status(400).json({ message: "errors.user.userNotExists" })
    }
  } else {
    res.status(400).json({ message: "errors.user.userNotExists" })
  }
}
