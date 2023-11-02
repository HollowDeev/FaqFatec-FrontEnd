
import temaContexto from "./context/TemaContexto"
import {useContext} from 'react'
import Home from "./pages/Home/Home"
import { Route, Routes } from "react-router"
import RequireAuth from "./context/Auth/RequireAuth"
import { Login } from "./pages/Login/Login"
import { Cabecalho } from "./components/Cabecalho/Cabecalho"
import Rodape from "./components/Rodape/Rodape"
import PainelGerenciamento from "./pages/PainelGerenciamento/PainelGerenciamento"

function Main() {

  const {tema} = useContext(temaContexto)

  return (

    <main className={` ${tema} text-foreground bg-background2 sm:bg-[url(bg-cps.png)] sm:bg-right sm:bg-repeat-y sm:bg-fixed h-full min-h-[100vh] flex flex-col justify-between font-roboto`}>
      <Cabecalho />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/adm" element={
          <RequireAuth level='1'>
            <PainelGerenciamento />
          </RequireAuth>
        }/>

      </Routes>

      <Rodape />
    </main>

  )
}

export default Main
