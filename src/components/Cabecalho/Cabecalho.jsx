import { useContext } from "react"
import { AuthContext } from "../../context/Auth/AuthProvider"
import LogoFatec from "../../assets/logo.png"
import { Bell, User,  } from "@phosphor-icons/react"
import BarraPesquisa from "../BarraPesquisa/BarraPesquisa"
import temaContexto from "../../context/TemaContexto"
import { Link } from "react-router-dom"


export const Cabecalho = () => {


  const {usuario} = useContext(AuthContext)
  const {tema} = useContext(temaContexto)

  const content1 = tema == "dark" ? "#18181B" : "#fff"

  let levelUsuario = usuario === null ? 0 : usuario.level

  return (
    <header className="p-5 flex items-center justify-between  sm:justify-normal sm:gap-5 md:justify-between">

        <Link to='/'><img src={LogoFatec} alt="Fatec Itapira" className="w-24" /></Link>

        <div className="flex gap-4 items-center sm:w-full sm:justify-between md:hidden">
          
          <div className="flex-1">
            <BarraPesquisa/>
          </div>
          
          {levelUsuario == 0 ? 
            <div className="rounded-full bg-content5 p-2 ">
              <Bell size={24} color="#fdfcfc" weight="fill" />
            </div>
            :
            <div className="rounded-full bg-foreground p-2  w-10 ">
              <User size={24} color={content1} weight="fill" />
            </div>
          }

        </div>

        <div className="hidden md:flex md:w-full md:justify-center">
          <BarraPesquisa/>
        </div>

        <>
          <div className="md:w-12 md:ml-10 hidden md:flex">
            <div className="rounded-full bg-foreground p-2 ">
              <User size={24} color={content1} weight="fill" />
            </div>
          </div>
        </>
        
        {/* <>
            <div className="md:w-12 md:ml-10 hidden md:flex">
              <div className="rounded-full bg-content5 p-2 ">
                <Bell size={24} color="#fdfcfc" weight="fill" />
              </div>
            </div>
        </> */}
        

    </header>
  )
}
