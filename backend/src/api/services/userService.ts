import User from "../users/model"

//  Find User By Id
export const findUserById = async (userId) => {
  const userFound = await User.findOne({ _id: userId })
    .then((user) => {
      return user
    })
    .catch((err) => {
      console.error(err)
    })

  return userFound
}

//  Find User By Username
export const findUserByUsername = async (username) => {
  const userFound = await User.findOne({ username: username })
    .then((user) => {
      return user
    })
    .catch((err) => {
      console.error(err)
    })

  return userFound
}

export const isUserAdmin = async (userId) => {
  try {
    const isAdmin = await User.find({
      $and: [{ _id: userId }, { role: "admin" }],
    })

    if (isAdmin.length > 0) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}
