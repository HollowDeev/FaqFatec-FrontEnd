
import temaContexto from "./context/TemaContexto"
import {useContext} from 'react'
import Home from "./pages/Home/Home"
import { Route, Routes } from "react-router"
import RequireAuth from "./context/Auth/RequireAuth"
import { Login } from "./pages/Login/Login"
import { Cabecalho } from "./components/Cabecalho/Cabecalho"
import Rodape from "./components/Rodape/Rodape"
import PainelGerenciamento from "./pages/PainelGerenciamento/PainelGerenciamento"
import RecuperarSenha from "./pages/RecuperarSenha/RecuperarSenha"
import Registro from "./pages/Registro/Registro"

function Main() {

  const {tema} = useContext(temaContexto)

  return (

  <main className={` ${tema} text-foreground bg-background2 ${tema == 'dark' ? 'sm:bg-dark' : 'sm:bg-light'} sm:bg-right sm:bg-repeat-y sm:bg-fixed h-full min-h-[100vh] flex flex-col justify-between font-roboto`}>
      <Cabecalho />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/adm" element={
          <RequireAuth level={1}>
            <PainelGerenciamento />
          </RequireAuth>
        }/>
        <Route path="/recuperarSenha" element={
          <RequireAuth>
            <RecuperarSenha />
          </RequireAuth>
        } />
        <Route path="/registrar" element={
          <Registro />
        } />
      </Routes>

      <Rodape />
    </main>

  )
}

export default Main
