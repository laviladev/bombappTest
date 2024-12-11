import Review from "./model"
import { updatePlaceRating } from "../services/placeService"

export const list = async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  const skip = (page - 1) * limit

  Review.find()
    .populate("user", ["username"])
    .populate("place", ["name", "description"])
    .limit(Number(limit))
    .skip(skip)
    .sort({ createdAt: -1 })
    .then(async (reviews) => {
      const total = await Review.estimatedDocumentCount()
      const totalPages = Math.ceil(total / limit)
      const hasMore = page < totalPages

      res.status(200).json({
        hasMore,
        totalPages,
        total,
        data: reviews,
        currentPage: page,
      })
    })
}

export const listPlacesWithReviews = async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  const skip = (page - 1) * limit

  const lookUpForPlaces = {
    from: "places",
    localField: "place",
    foreignField: "_id",
    as: "place",
  }
  const project = {
    __v: 0,
  }
  const unwind = {
    path: "$place",
    preserveNullAndEmptyArrays: true,
  }
  const gruopByPlace = {
    _id: "$place",
    reviews: {
      $push: {
        _id: "$_id",
        user: "$user",
        rating: "$rating",
        comment: "$comment",
        createdAt: "$createdAt",
      },
    },
  }
  const placesWithReviews = await Review.aggregate([
    { $lookup: lookUpForPlaces },
    { $project: project },
    { $unwind: unwind },
    { $group: gruopByPlace },
    { $limit: limit },
    { $skip: skip },
  ])
  return res.status(200).json({ data: placesWithReviews })
}

export const getReviewsByUser = async (req, res) => {
  const reviews = await Review.find({ user: req.params.id })
  if (reviews) {
    res.status(200).json({ reviews })
  } else {
    res.status(404).json({ message: "Reviews Not Found" })
  }
}

export const getReviewsByPlace = async (req, res) => {
  const reviews = await Review.find({ place: req.params.id }).populate("place")
  if (reviews) {
    res.status(200).json({ reviews })
  } else {
    res.status(404).json({ message: "Reviews Not Found" })
  }
}

export const create = async (req, res) => {
  const { comment, userId, placeId, rating } = req.body
  if (!placeId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: "Not valid id", error: true })
  }
  const review = await Review.findOne({ place: placeId, user: userId })
  if (!review) {
    const reviewObject = {
      comment,
      user: userId,
      place: placeId,
      rating,
    }

    const newReview = new Review(reviewObject)
    newReview.save().then((createdReview) => {
      updatePlaceRating(placeId)
      res.status(200).json({ createdObject: createdReview })
    })
  } else {
    res.status(400).json({
      message: "Users can make just a single review for each place",
      error: true,
    })
  }
}

export const update = async (req, res) => {
  const { id, rating, comment } = req.body
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: "Not valid id", error: true })
  }
  const updated = await Review.updateOne({ _id: id }, { rating, comment })
  if (updated && updated.modifiedCount === 1) {
    const review = await Review.findOne({ _id: id })
    updatePlaceRating(review?.place)
    res.status(200).json({ message: "ok" })
  } else {
    res.status(400).json({ message: "Review was not updated", error: true })
  }
}

export const deleteReview = async (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: "Not valid id", error: true })
  }

  const query = await Review.findOneAndDelete({
    _id: req.params.id,
    user: req.body.userId,
  })

  if (query) {
    updatePlaceRating(query.place)
    res.status(200).json({ message: "ok", query })
  } else {
    res.status(400).json({
      message: "Review does not exits or was not created by this user",
      error: true,
    })
  }
}

export const updateRating = async (req, res) => {
  const result = await updatePlaceRating(req.params.id)
  res.status(200).json({ message: "ok", result })
}
