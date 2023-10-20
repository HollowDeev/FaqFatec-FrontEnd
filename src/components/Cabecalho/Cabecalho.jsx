import { useContext } from "react"
import { AuthContext } from "../../context/Auth/AuthProvider"
import LogoFatec from "../../assets/logo.png"
import { Bell,  } from "@phosphor-icons/react"
import BarraPesquisa from "../BarraPesquisa/BarraPesquisa"

export const Cabecalho = () => {

  const {usuario} = useContext(AuthContext)
  let levelUsuario = usuario === null ? 0 : usuario.level

  return (
    <header className="p-5 flex items-center justify-between  sm:justify-normal sm:gap-5 md:justify-between">

        <img src={LogoFatec} alt="Fatec Itapira" className="w-24" />

        <div className="flex gap-4 items-center sm:w-full sm:justify-between md:hidden">
          
          <div className="flex-1">
            <BarraPesquisa/>
          </div>
          
          {!usuario && 
          <div className="rounded-full bg-content5 p-2 ">
            <Bell size={24} color="#fdfcfc" weight="fill" />
          </div>}

        </div>

        <div className="hidden md:flex md:w-full md:justify-center">
          <BarraPesquisa/>
        </div>

        {levelUsuario == 0 && 
          <>
            <div className="md:w-12 md:ml-10 hidden md:flex">
              <div className="rounded-full bg-content5 p-2  w-10 ">
                <Bell size={24} color="#fdfcfc" weight="fill" />
              </div>
            </div>
          </>
        
        }

    </header>
  )
}
