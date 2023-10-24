
import temaContexto from "./context/TemaContexto"
import {useContext} from 'react'
import Home from "./pages/Home/Home"
import Adm from "./pages/Adm/Adm"
import { Route, Routes } from "react-router"
import RequireAuth from "./context/Auth/RequireAuth"
import { Login } from "./pages/Login/Login"
import { Cabecalho } from "./components/Cabecalho/Cabecalho"

function Main() {

  const {tema} = useContext(temaContexto)

  return (

    <main className={` ${tema} text-foreground bg-background sm:bg-[url(bg-cps.png)] sm:bg-right sm:bg-repeat-y sm:bg-fixed h-full font-roboto`}>
      <Cabecalho />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
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
