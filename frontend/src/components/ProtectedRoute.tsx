
import { useNavigate } from "@solidjs/router"

const Login = (props) => {
  const userIsLogin = false
  const navigate = useNavigate()

  console.log("Protected Route")

  if (!userIsLogin) {
    navigate("/login")
  }
  return (
    <>
      <h3>Protected Route</h3>
      {props.children}
    </>
  )
}

export default Login
