import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"

export const WebPlayer = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
