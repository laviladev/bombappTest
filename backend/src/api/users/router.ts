import HyperExpress from "hyper-express"
import { validateUser } from "../middlewares/validator"
import { list, get, create, login } from "./controller"

const router = new HyperExpress.Router()

router.get("/", list)

router.get("/:username", get)

router.post("/register", validateUser, create)

router.post("/login", login)

/*
router.route("/logout").get(logout);

router.route("/:id").put(authenticator, validateUser, update);
*/
export default router
