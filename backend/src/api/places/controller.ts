import Place from "./model"
import { getPlaceTypeByName } from "../services/placeService"

export const list = async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  const skip = (page - 1) * limit

  Place.find()
    .limit(Number(limit))
    .skip(skip)
    .sort({ createdAt: -1 })
    .then(async (places) => {
      const total = await Place.estimatedDocumentCount()
      const totalPages = Math.ceil(total / limit)
      const hasMore = page < totalPages

      res.status(200).json({
        hasMore,
        totalPages,
        total,
        data: places,
        currentPage: page,
      })
    })
}

export const getPlacesByUser = async (req, res) => {
  const id = req.params.id
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: "Not valid id", error: true })
  }
  const places = await Place.find({ user: id })
  if (places) {
    res.status(200).json({ places })
  } else {
    res.status(404).json({ message: "Places Not Found" })
  }
}

export const getPlaceById = async (req, res) => {
  const id = req.params.id
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: "Not valid id", error: true })
  }
  const place = await Place.findOne({ _id: id })
  if (place) {
    res.status(200).json(place)
  } else {
    res.status(404).json({ message: "Place Not Found", error: true })
  }
}

export const create = async (req, res) => {
  const { description, userId, typeName, name, location } = req.body
  const placeType = await getPlaceTypeByName(typeName)
  if (!placeType) {
    return res
      .status(400)
      .json({ message: "This place type does not exits", error: true })
  }
  const place = {
    description,
    user: userId,
    type: placeType._id,
    name,
    location,
  }

  const newPlace = new Place(place)
  newPlace.save().then((createdPlace) => {
    res.status(200).json({ createdObject: createdPlace })
  })
}

export const update = async (req, res) => {
  const { id, description, userId, typeName, name, location } = req.body
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: "Not valid id", error: true })
  }
  const place = await Place.find({ _id: id, user: userId })
  if (!place) {
    return res.status(400).json({
      message: "Place does not exits or was not created by user",
      error: true,
    })
  }
  const placeType = await getPlaceTypeByName(typeName)
  if (!placeType) {
    return res
      .status(400)
      .json({ message: "This place type does not exits", error: true })
  }
  const updated = await Place.updateOne(
    { _id: id },
    { description, type: placeType._id, name, location },
  )
  if (updated && updated.modifiedCount === 1) {
    res.status(200).json({ message: "ok" })
  } else {
    res.status(400).json({ message: "Place was not updated", error: true })
  }
}

export const deletePlace = async (req, res) => {
  const id = req.params.id
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: "Not valid id", error: true })
  }
  const query = await Place.findOneAndDelete({ _id: id })
  if (query) {
    res.status(200).json({ message: "ok", query })
  } else {
    res.status(400).json({ message: "Place was not Deleted", error: true })
  }
}
