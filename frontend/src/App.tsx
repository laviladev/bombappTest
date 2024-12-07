import { Component, For, lazy } from "solid-js"
import { Router, Route } from "@solidjs/router"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"

const Routes = [
  {
    path: "/",
    component: ProtectedRoute,
    subRoutes: [
      {
        path: "/",
        component: lazy(() => import("./pages/Home"))
      },
      {
        path: "/home",
        component: lazy(() => import("./pages/Home"))
      },
    ]
  },
  {
    path: "/register",
    component: lazy(() => import("./pages/Register"))
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
        {(route) => route.subRoutes ? (
          <Route path={route.path} component={route.component} >
            <For each={route.subRoutes}>
              {(subRoute) => (
                <Route path={subRoute.path} component={subRoute.component} />
              )}
            </For>
          </Route>
        ) 
          : (
            <Route path={route.path} component={route.component} />
          )}
      </For>
    </Router>
  )
}

export default App
