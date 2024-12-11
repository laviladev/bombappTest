import PlaceType from "./model"
import { getPlaceTypeByName } from "../../services/placeService"

export const listPlacesTypes = async (req, res) => {
  const placesTypes = await PlaceType.find()
  if (placesTypes) {
    res.status(200).json({ message: "ok", placesTypes })
  } else {
    return res.status(404).json({ message: "Not found placesTypes" })
  }
}

export const getByName = async (req, res) => {
  const placeType = await getPlaceTypeByName(req.params.name)
  if (placeType) {
    res.status(200).json({ message: "ok", placeType })
  } else {
    return res
      .status(404)
      .json({ message: "Not found place type" + req.params.name })
  }
}

export const addPlacesTypes = async (req, res) => {
  // TODO:validate duplicate names
  const placesTypes = req.body.placesTypes
  const placesTypesArray = placesTypes.map((type) => {
    return { name: type }
  })
  const result = await PlaceType.collection.insertMany(placesTypesArray)

  return res.status(200).json({ message: "ok", createdObjects: result })
}

export const deletePlaceType = (req, res) => {
  PlaceType.deleteOne({ name: req.params.name }, (err) => {
    if (err) {
      return res.status(500).json({ message: err })
    } else {
      return res
        .status(200)
        .json({ message: "ok", placesTypesDeleted: req.body.name })
    }
  })
}
