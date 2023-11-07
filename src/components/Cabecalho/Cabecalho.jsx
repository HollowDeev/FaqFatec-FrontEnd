import { useContext } from "react"
import { AuthContext } from "../../context/Auth/AuthProvider"
import LogoFatec from "../../assets/logo.png"
import { SignIn, SignOut, User, UserGear,  } from "@phosphor-icons/react"
import BarraPesquisa from "../BarraPesquisa/BarraPesquisa"
import temaContexto from "../../context/TemaContexto"
import { Link, useNavigate } from "react-router-dom"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"


export const Cabecalho = () => {


  const {usuario, sair} = useContext(AuthContext)
  const {tema} = useContext(temaContexto)

  const navigate = useNavigate()

  const content1 = tema == "dark" ? "#18181B" : "#fff"

  const handleAction = (acao) => {
    switch(acao){
      case 'sair':
        sair()
        navigate('/')
        break

      case 'painelADM':
        navigate('/adm')
        break

      case 'entrar':
        navigate('/login')
        break
        
    }
  }

  return (
    <header className="p-5 flex items-center justify-between  sm:justify-normal sm:gap-5 md:justify-between">

        <Link to='/'><img src={LogoFatec} alt="Fatec Itapira" className="w-24" /></Link>

        <div className="flex gap-4 items-center sm:w-full sm:justify-between md:hidden">
          
          <div className="flex-1">
            <BarraPesquisa/>
          </div>
          
          <Dropdown>
            <DropdownMenu onAction={(acao) => handleAction(acao)}>
                {usuario && usuario.level > 0 && 
                  <DropdownItem className="text-foreground" startContent={
                    <UserGear size={20} color="#f9f1f1" weight="fill" />
                  } key='painelADM'>
                    Painel Gerenciamento
                  </DropdownItem>
                }
                {usuario ?
                  <DropdownItem className="text-danger" startContent={
                    <SignOut size={20} color="#FF000F" weight="fill" />
                  } key='sair'>
                    Sair
                  </DropdownItem>
                  :
                  <DropdownItem className="text-success" key='entrar' startContent={
                    <SignIn size={20} color="#17c964" weight="fill" />
                  }>
                    Entrar
                  </DropdownItem>
                }
              </DropdownMenu>
          </Dropdown>

        </div>

        <div className="hidden md:flex md:w-full md:justify-center">
          <BarraPesquisa/>
        </div>

        <>
          <div className="md:w-12 md:ml-10 hidden md:flex">
            <Dropdown className={tema}>
              <DropdownTrigger>
                <div className="rounded-full bg-foreground p-2 cursor-pointer">
                  <User size={24} color={content1} weight="fill" />
                </div>
              </DropdownTrigger>
              <DropdownMenu onAction={(acao) => handleAction(acao)}>
                {usuario && usuario.level > 0 && 
                  <DropdownItem className="text-foreground" startContent={
                    <UserGear size={20} color="#f9f1f1" weight="fill" />
                  } key='painelADM'>
                    Painel Gerenciamento
                  </DropdownItem>
                }
                {usuario ?
                  <DropdownItem className="text-danger" startContent={
                    <SignOut size={20} color="#FF000F" weight="fill" />
                  } key='sair'>
                    Sair
                  </DropdownItem>
                  :
                  <DropdownItem className="text-success" key='entrar' startContent={
                    <SignIn size={20} color="#17c964" weight="fill" />
                  }>
                    Entrar
                  </DropdownItem>
                }
              </DropdownMenu>
            </Dropdown>
          </div>
        </>


    </header>
  )
}
