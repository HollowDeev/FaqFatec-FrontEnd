import { useContext } from "react"
import { AuthContext } from "../../context/Auth/AuthProvider"
import LogoFatec from "../../assets/logo.png"
import LogoFatecLight from "../../assets/logo-light.png"
import { MoonStars, Password, SignIn, SignOut, Sun, User, UserCirclePlus, UserGear, } from "@phosphor-icons/react"
import BarraPesquisa from "../BarraPesquisa/BarraPesquisa"
import temaContexto from "../../context/TemaContexto"
import { Link, useNavigate } from "react-router-dom"
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react"
import Notificacao from "../Notificacao/Notificacao"
import { useState } from "react"
import { useEffect } from "react"

const IconeTema = () => {
  const { tema, foreground } = useContext(temaContexto)

  switch (tema) {
    case 'light':
      return (
        <div className="flex items-center gap-2 border-1 rounded-full px-2 py-1">
          <p>LIGHT</p>
          <Sun size={20} color={foreground} weight="fill" />
        </div>
      )

    case 'dark':
      return (
        <div className="flex items-center gap-2 border-1 rounded-full px-2 py-1">
          <p>DARK</p>
          <MoonStars size={20} color={foreground} weight="fill" />
        </div>
      )
  }
}


export const Cabecalho = () => {


  const { usuario, sair, perguntasAtualizadas } = useContext(AuthContext)
  const nomeUsuario = usuario ? usuario.nome.split(' ')[0] : ''

  const { tema, foreground, setTema } = useContext(temaContexto)
  const [logoURL, setLogoURL] = useState(LogoFatec)
  useEffect(() => {
    setLogoURL(tema == 'light' ? LogoFatecLight : LogoFatec)
  }, [tema])

  const navigate = useNavigate()

  const content1 = tema == "dark" ? "#18181B" : "#fff"

  const handleAction = (acao) => {
    switch (acao) {
      case 'sair':
        sair()
        window.location.reload(true)
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
        break

      case 'toggleTema':

        setTema(tema == 'dark' ? 'light' : 'dark')
        break
    }
  }

  return (
    <header className="p-5 flex items-center justify-between  sm:justify-normal sm:gap-5 md:justify-between">

      <Link to='/'><img src={logoURL} alt="Fatec Itapira" className="w-24" /></Link>

      <div className="flex gap-4 items-center sm:w-full sm:justify-between md:hidden">

        <div className="flex-1">
          <BarraPesquisa />
        </div>

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
                <DropdownSection showDivider>
                  <DropdownItem className="text-foreground">
                    Olá {nomeUsuario}, Tudo bem?
                  </DropdownItem>
                </DropdownSection>
              }
              <DropdownSection showDivider>
                <DropdownItem className="text-foreground " endContent={
                  <IconeTema />
                } key='toggleTema'>
                  Tema:
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title='ações'>
                {usuario && usuario.level > 0 &&
                  <DropdownItem className="text-foreground" startContent={
                    <UserGear size={20} color={foreground} weight="fill" />
                  } key='painelADM'>
                    Painel Gerenciamento
                  </DropdownItem>
                }
                {usuario &&
                  <DropdownItem
                    startContent={
                      <Password size={20} color={foreground} />
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
                    <UserCirclePlus size={20} color={foreground} />
                  }>
                    Criar Conta
                  </DropdownItem>
                }
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        }


      </div>

      <div className="hidden md:flex md:w-full md:justify-center">
        <BarraPesquisa />
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
                  <DropdownSection showDivider >
                    <DropdownItem className="text-foreground">
                      Olá {nomeUsuario}, Tudo bem?
                    </DropdownItem>
                  </DropdownSection>
                }
                <DropdownSection showDivider title='Mudar Tema'>
                  <DropdownItem className="text-foreground " endContent={
                    <IconeTema />
                  } key='toggleTema'>
                    Tema:
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Ações">
                  {usuario && usuario.level > 0 &&
                    <DropdownItem className="text-foreground" startContent={
                      <UserGear size={20} color={foreground} weight="fill" />
                    } key='painelADM'>
                      Painel Gerenciamento
                    </DropdownItem>
                  }
                  {usuario &&
                    <DropdownItem
                      startContent={
                        <Password size={20} color={foreground} />
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
                      <UserCirclePlus size={20} color={foreground} />
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
