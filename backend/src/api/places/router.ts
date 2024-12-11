import { Router } from "express"
import routerTypes from "./placesTypes/router"
import * as controllers from "./controller"
const { list, getPlaceById, getPlacesByUser, create, update, deletePlace } =
  controllers

const router = Router()

// TODO: Add admin authorization
router.use("/types", routerTypes)

router.route("/").get(list)

router.route("/:id").get(getPlaceById)

router.route("/getByUser/:id").get(getPlacesByUser)

router.route("/create").post(create)

router.route("/update").put(update)

router.route("/delete/:id").delete(deletePlace)

export default router
