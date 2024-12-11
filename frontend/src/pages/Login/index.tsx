import { createSignal } from "solid-js"
import TextInput from "../../components/TextInput"
import Card from "../../components/Card"
import Button from "../../components/Button"

const Login = () => {

  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')

  const handleSubmit = (e: Event) => {
    e.preventDefault()

    console.log(email(), password())
  }

  return (
    <div>
      <Card class="w-6/12">
        <form class="grid place-items-center" id="login-form" onSubmit={handleSubmit}>
          <h2>
            Login
          </h2>
          <br />
          <TextInput
            type="email"
            name="email"
            caption="Email"
            placeholder="Email"
            required
            containerClass="w-6/12"
            class="mt-1"
            onChange={(e: string) => setEmail(e)}
            value={email}
          />
          <TextInput
            type="password"
            name="password"
            caption="Password"
            placeholder="Password"
            required
            containerClass="w-6/12"
            class="mt-1"
            onChange={(e: string) => setPassword(e)}
            value={password}
          />
          <Button
            icon={<i class="fa-solid fa-user" />}
            caption="Login"
            class="m-4"
            id="login-button"
            type="submit"
          />
        </form>
      </Card>
    </div>
  )
}

export default Login
