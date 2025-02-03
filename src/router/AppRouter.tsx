import { Route, Routes } from "react-router-dom"
import { WebPlayerPage } from "../webplayer/pages/WebPlayerPage"

export const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<WebPlayerPage/>} />
    </Routes>

  )
}
