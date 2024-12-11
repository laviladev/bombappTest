import { verify } from "jsonwebtoken"
import config from "../../config"

export const authenticator = (req, res, next) => {
  const token = req.headers["x-access-token"]
  if (!token)
    return res
      .status(401)
      .json({ message: "header without token", error: true })
  try {
    const decoded = verify(token, config.jwtKey as string)
    const { userId } = decoded as { userId: string }
    req.body.userId = userId

    next()
  } catch (err) {
    res.status(401).json({ message: "errors.notAuthenticated", error: true })
  }
}
