import { Router } from "express"
import { authenticator } from "./middlewares/authenticator"
import users from "./users/router"
import places from "./places/router"
import reviews from "./reviews/router"

const router = Router()

console.log("API")

router.use("/users", users)
router.use("/places", authenticator, places)
router.use("/reviews", authenticator, reviews)

export default router
