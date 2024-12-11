import HyperExpress from "hyper-express"
import { authenticator } from "./middlewares/authenticator"
import users from "./users/router"
import places from "./places/router"
import reviews from "./reviews/router"

const router = new HyperExpress.Router()

router.use("/users", users)
router.use("/places", authenticator, places)
router.use("/reviews", authenticator, reviews)

export default router
