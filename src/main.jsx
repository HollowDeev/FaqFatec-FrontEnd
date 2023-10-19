
import temaContexto from "./context/TemaContexto"
import {useContext} from 'react'
import Home from "./pages/Home/Home"
import Adm from "./pages/Adm/Adm"
import { Route, Routes } from "react-router"
import RequireAuth from "./context/Auth/RequireAuth"
import { Login } from "./pages/Login/Login"

function Main() {

  const {tema} = useContext(temaContexto)

  return (
    <main className={` ${tema} text-foreground bg-background`}>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adm" element={
          <RequireAuth>
            <Adm />
          </RequireAuth>
        }/>

      </Routes>
    </main>
  )
}

export default Main
