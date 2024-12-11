import Place from "../places/model"
import Review from "../reviews/model"
import PlaceType from "../places/placesTypes/model"

export const round = (num) => {
  const m = Number((Math.abs(num) * 100).toPrecision(2))
  return Math.round(m) / 100
}

export const updatePlaceRating = async (id) => {
  const result = await Review.aggregate([
    {
      $match: { place: id },
    },
    {
      $group: {
        _id: null,
        average: {
          $avg: "$rating",
        },
      },
    },
  ])
  if (result.length === 0) {
    return "Place not found"
  }
  const average = (result[0] && result[0].average) || 0
  await Place.updateOne(
    { _id: id },
    { $set: { averageRating: round(average) } },
  )
  return result
}

export const getPlaceTypeByName = async (name) => {
  return await PlaceType.findOne({ name: name })
}
