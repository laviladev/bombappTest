import HyperExpress from "hyper-express"
import * as controllers from "./controller"
const { listPlacesTypes, getByName, addPlacesTypes, deletePlaceType } =
  controllers

const router = new HyperExpress.Router()

router.route("/").get(listPlacesTypes)

router.route("/getByName").get(getByName)

router.route("/create").post(addPlacesTypes)

router.route("/delete/:name").delete(deletePlaceType)

export default router
