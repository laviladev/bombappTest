import { Router } from "express"
import * as controllers from "./controller"
const {
  list,
  listPlacesWithReviews,
  getReviewsByUser,
  getReviewsByPlace,
  create,
  update,
  deleteReview,
  updateRating,
} = controllers

const router = Router()

router.route("/").get(list)

router.route("/places-with-reviews").get(listPlacesWithReviews)

router.route("/get-by-place/:id").get(getReviewsByPlace)

router.route("/get-by-user/:id").get(getReviewsByUser)

router.route("/create").post(create)

router.route("/update").put(update)

router.route("/update-rating/:id").put(updateRating)

router.route("/delete/:id").delete(deleteReview)

export default router
