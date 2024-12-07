import { createSignal } from "solid-js"
import Input from "../../components/Input"
import Card from "../../components/Card"

const Login = () => {

  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')

  return (
    <div class="w-2/5">
      <Card>
        <Input
          type="email"
          name="email"
          caption="Email"
          required
          class="mt-1"
          onChange={(e: string) => setEmail(e)}
          value={email()}
        />
      </Card>
    </div>
  )
}

export default Login
