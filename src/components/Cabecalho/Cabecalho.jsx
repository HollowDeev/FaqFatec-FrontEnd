import { useContext } from "react"
import { AuthContext } from "../../context/Auth/AuthProvider"
import LogoFatec from "../../assets/logo.png"
import {Password, SignIn, SignOut, User, UserCirclePlus, UserGear,  } from "@phosphor-icons/react"
import BarraPesquisa from "../BarraPesquisa/BarraPesquisa"
import temaContexto from "../../context/TemaContexto"
import { Link, useNavigate } from "react-router-dom"
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react"
import Notificacao from "../Notificacao/Notificacao"


export const Cabecalho = () => {


  const {usuario, sair, perguntasAtualizadas} = useContext(AuthContext)
  const nomeUsuario = usuario ? usuario.nome.split(' ')[0] : ''

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
      
      case 'trocarSenha':
        navigate('/recuperarsenha')
        break

      case 'registrar':
        navigate('/registrar')
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
            <DropdownTrigger className={tema}>
                <div className="rounded-full bg-foreground p-2 cursor-pointer">
                  <User size={24} color={content1} weight="fill" />
                </div>
              </DropdownTrigger>
            <DropdownMenu onAction={(acao) => handleAction(acao)}>
              {usuario &&
                <DropdownSection showDivider>
                  <DropdownItem>
                    Olá {nomeUsuario}, Tudo bem?
                  </DropdownItem>
                </DropdownSection>
              }
              <DropdownSection title='ações'>
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
                {!usuario &&
                    <DropdownItem className="text-foreground" key='registrar' startContent={
                        <UserCirclePlus size={20} color="#f9f1f1" />
                      }>
                        Criar Conta
                    </DropdownItem>
                  }
              </DropdownSection>    
            </DropdownMenu>
          </Dropdown>

        </div>

        <div className="hidden md:flex md:w-full md:justify-center">
          <BarraPesquisa/>
        </div>

        <>
          <div className="md:w-12 md:ml-10 hidden md:flex">
          {perguntasAtualizadas && perguntasAtualizadas.length != 0 ?
            <Notificacao />
           :
           <Dropdown className={tema}>
              <DropdownTrigger>
                <div className="rounded-full bg-foreground p-2 cursor-pointer">
                  <User size={24} color={content1} weight="fill" />
                </div>
              </DropdownTrigger>
              <DropdownMenu onAction={(acao) => handleAction(acao)}>
                {usuario &&
                  <DropdownSection showDivider title=''>
                    <DropdownItem className="text-foreground">
                      Olá {nomeUsuario}, Tudo bem?
                    </DropdownItem>
                  </DropdownSection>
                }
                <DropdownSection>
                  {usuario && usuario.level > 0 && 
                    <DropdownItem className="text-foreground" startContent={
                      <UserGear size={20} color="#f9f1f1" weight="fill" />
                    } key='painelADM'>
                      Painel Gerenciamento
                    </DropdownItem>
                  }
                  {usuario &&
                    <DropdownItem 
                      startContent={
                        <Password size={20} color="#f9f1f1" />
                      } 
                      key='trocarSenha'
                      className="text-foreground">
                        Esqueceu a senha?
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
                  {!usuario &&
                    <DropdownItem className="text-foreground" key='registrar' startContent={
                        <UserCirclePlus size={20} color="#f9f1f1" />
                      }>
                        Criar Conta
                    </DropdownItem>
                  }
                </DropdownSection>    
              </DropdownMenu>
            </Dropdown>
          }
          </div>
        </>


    </header>
  )
}
