import { Component, For, lazy } from "solid-js"
import { Router, Route } from "@solidjs/router"
import Login from "./pages/Login"

const Routes = [
  {
    path: "/",
    component: Login
  },
  {
    path: "/home",
    component: lazy(() => import("./pages/Home"))
  },
  {
    path: "/login",
    component: Login
  }
]

const App: Component = () => {
  return (
    <Router>
      <For each={Routes}>
        {(route) => <Route path={route.path} component={route.component} />}
      </For>
    </Router>
  )
}

export default App
