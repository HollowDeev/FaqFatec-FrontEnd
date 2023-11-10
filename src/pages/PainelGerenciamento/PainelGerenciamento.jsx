import { useContext, useEffect, useState } from "react";
import useGerenciadorContexto from "../../hooks/useGerenciadorContexto" 
import CardPergunta from "../../components/CardPergunta/CardPergunta";
import temaContexto from "../../context/TemaContexto";
import { Calendar, FolderNotchOpen, Folders, Plus, UserCircleGear } from "@phosphor-icons/react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

import Icone from "../../components/Icone/Icone";
import CampoModais from "../../components/CampoModais/CampoModais";
import { useGerenciador } from "../../hooks/useGerenciador";
import CardTema from '../../components/CardTema/CardTema'
import { AuthContext } from "../../context/Auth/AuthProvider";
import CardColaboradores from "../../components/CardColaboradores/CardColaboradores";
import dataContexto from "../../context/Data/dataContexto";
import { useNavigate } from "react-router-dom";



export default function PainelGerenciamento() {

  const {checarAutorizacao} = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  // Contexto do tema - light / dark
  const {tema} = useContext(temaContexto)
  const foregroundColor = tema == "dark" ? "#ECEDEE" : "#11181C"

  // Contexto gerenciamento de items - gerenciamento -> objeto / gerenciar -> função base para gerenciar
  const {gerenciamento, gerenciar, definirBuscaColaboradores} = useGerenciadorContexto()

  // Hook com funções de gerenciamento(precisam da função base "gerenciar")
  const gerenciador = useGerenciador()

  const {dbTemas} = useContext(dataContexto)

  // Armazena o item do menu de temas selecionado
  const [itemSelecionado, definirItemSelecionado] = useState('')

  // Armazena o tema selecionado
  const [temaSelecionado, definirTemaSelecionado] = useState('todos')

  // Temas possiveis para a filtragem
  const [temasParaFiltragem, definirTemasParaFiltragem] = useState([]) 

  useEffect(() => {
    const verificar = async() => {
      setLoading(true)
      const dadosUsuario = await checarAutorizacao()

      if(!dadosUsuario){
        navigate('/login')
        return
      } else if(dadosUsuario && dadosUsuario.level < 2){
        navigate('/')
        return
      } else {
        setLoading(false)
      }
    }

    verificar()
  }, [])

  useEffect(() => {
    if(dbTemas != null){
      const temas = [
        {
          tema: "todos",
          icone: "Cards"
        },
        ...dbTemas,
      ]
      definirTemasParaFiltragem(temas)
    }

  }, [dbTemas])

  const [painel, definirPainel] = useState("perguntas")

  const alternarPainel = (painelDesejado) => {
    if(painel != painelDesejado){
      if(painelDesejado){
        definirBuscaColaboradores(true)
      }
      definirPainel(painelDesejado)
    } else {
      definirPainel('perguntas')
    }
  }

  const adicionarItem = () => {
    switch(painel){
      case 'perguntas':
        gerenciador.adicionarPergunta(gerenciar)
        break

      case 'temas':
        gerenciador.adicionarTema(gerenciar)
        break

      case 'colaboradores':
        gerenciador.adicionarColaborador(gerenciar)
        break
    }

  }

  useEffect(() => {
    console.log(gerenciamento)
  }, [ gerenciamento ])

  //* Pega os dados do usuario logado
  const {usuario} = useContext(AuthContext)

  return (

  <>
    {loading &&
      
      <div className="relative flex ">

      {/* Modais */}
      <CampoModais />

      {/* Botoes esquerdo versão desktop */}
      <div className="hidden w-16 lg:flex bg-content1 fixed bottom-[50%] translate-y-[50%] mx-10 flex-col justify-between items-center rounded-full ">
        <div className="flex flex-col justify-center h-32 g-5">

          {painel != 'temas' &&
            <div className="hover:bg-content2 p-2 cursor-pointer rounded-full" onClick={() => alternarPainel('temas')}>
              <Folders size={40} color="#fdfcfc" weight="fill" />
            </div>
          }

          {painel == 'temas' &&
            <div className="bg-content2 p-2 cursor-pointer rounded-full" onClick={() => alternarPainel('temas')}>
              <Folders size={40} color="#fdfcfc" weight="fill" />
            </div>
          }

          {usuario && usuario.level == 2 && painel != 'colaboradores' &&
            <div className="hover:bg-content2 rounded-full p-2 cursor-pointer" onClick={() => alternarPainel('colaboradores')}>
              <UserCircleGear size={40} color="#f9f1f1" weight="fill" />
            </div>
          }

          {usuario && usuario.level == 2 && painel == 'colaboradores' &&
            <div className="bg-content2 rounded-full p-2 cursor-pointer" onClick={() => alternarPainel('colaboradores')}>
              <UserCircleGear size={40} color="#f9f1f1" weight="fill" />
            </div>
          }
        </div>

        <div className="p-2 bg-content6 hover:bg-opacity-70 transition-all rounded-full flex items-center justify-center border-[10px] border-background2 cursor-pointer " onClick={() => adicionarItem()}>
          <Plus size={40} color="#fdfcfc" weight="bold" />
        </div>
      </div>

      {/* Painel de perguntas */}
      <div className="w-full lg:w-[900px] xl:w-[1250px] m-auto px-2 sm:px-20 flex flex-col ">
    
        <div className="w-full flex flex-col items-center mb-20">
        
          {painel == "perguntas" &&
            <>
              <h1 className="text-2xl sm:text-3xl font-bold my-5">
                Perguntas
                <span className="text-content6"> Online</span>
              </h1>
              {temaSelecionado == "todos" ? 
                 <CardPergunta cor={foregroundColor} tipo="gerenciamento" /> 
                :
                 <CardPergunta cor={foregroundColor} tipo="gerenciamento" filtro="tema" temaParaFiltro={temaSelecionado}/> 
              }
            </>
          }

          {painel == 'temas' &&
            <>
              <h1 className="text-2xl sm:text-3xl font-bold my-5">
                Temas
                <span className="text-content6"> Online</span>
              </h1>
              <CardTema tipo="gerenciamento" />
            </>
          }

          {painel == 'colaboradores' &&
            <>
              <h1 className="text-2xl sm:text-3xl font-bold my-5">
                Colaboradores
                <span className="text-content6"> Online</span>
              </h1>
              <CardColaboradores />
            </>
          }
        </div>
      </div>

      {/* Botoes direito versão desktop */}
      <div className="hidden lg:flex fixed bottom-[50%] translate-y-[50%] right-0 mx-10 flex-col justify-between items-center gap-10">

        {painel == 'perguntas' &&

          <Dropdown className={tema} backdrop="blur">
            <DropdownTrigger >
              <div className="bg-content2 rounded-full p-4 hover:opacity-70 transition-all cursor-pointer">
                <FolderNotchOpen size={40} color="#fdfcfc" weight="fill" />
              </div>
            </DropdownTrigger>
            <DropdownMenu items={temasParaFiltragem} 
              selectionMode="single"
              selectedKeys={itemSelecionado}
              onSelectionChange={definirItemSelecionado}
              onAction={(key) => definirTemaSelecionado(key)}
            >
              {({tema, icone}) => (
                <DropdownItem 
                className="text-foreground"
                key={tema}
                startContent={<Icone icone={icone} tamanho={20}/>}
              >
                {tema.toUpperCase()}
              </DropdownItem>
              )}
              
            </DropdownMenu>
          </Dropdown>
          
        }

        <div className="bg-content2 rounded-full p-4 hover:opacity-70 transition-all cursor-pointer">
          <Calendar size={35} color="#fdfcfc" weight="fill" />
        </div>
      </div>

      {/* Menus de ação mobile */}
      <div className="fixed bottom-0 bg-background w-full px-5 flex justify-between items-center lg:hidden">
        <div className="flex flex-1 justify-around">

          {painel != 'temas' &&
            <div className="hover:bg-content2 rounded-full p-2 cursor-pointer" onClick={() => alternarPainel('temas')}>
              <Folders size={35} color="#fdfcfc" weight="fill" />
            </div>
          }

          {painel == 'temas' &&
            <div className="bg-content2 rounded-full p-2 cursor-pointer" onClick={() => alternarPainel('temas')}>
              <Folders size={35} color="#fdfcfc" weight="fill" />
            </div>
          }

          {usuario && usuario.level == 2 && painel != 'colaboradores' &&
            <div className="hover:bg-content2 rounded-full p-2 cursor-pointer" onClick={() => alternarPainel('colaboradores')}>
              <UserCircleGear size={35} color="#f9f1f1" weight="fill" />
            </div>
          }

          {usuario && usuario.level == 2 && painel == 'colaboradores' &&
            <div className="bg-content2 rounded-full p-2 cursor-pointer" onClick={() => alternarPainel('colaboradores')}>
              <UserCircleGear size={35} color="#f9f1f1" weight="fill" />
            </div>
          }
        </div>

        <div className="p-2 bg-content6 rounded-full relative bottom-8 border-8 border-background cursor-pointer" onClick={() => adicionarItem()}>
          <Plus size={40} color="#fdfcfc" weight="bold" />
        </div>

        <div className="flex flex-1 justify-around">
          <Calendar size={35} color="#fdfcfc" weight="fill" />
          <Dropdown className={tema} backdrop="blur">
            <DropdownTrigger>
              <FolderNotchOpen size={35} color="#fdfcfc" weight="fill" />
            </DropdownTrigger>
            <DropdownMenu items={temasParaFiltragem} 
            selectionMode="single"
            selectedKeys={itemSelecionado}
            onSelectionChange={definirItemSelecionado}
            onAction={(key) => definirTemaSelecionado(key)}
          >
            {(tema) => (
              <DropdownItem 
                className="text-foreground"
                key={tema.nome}
                startContent={<Icone icone={tema.icone} tamanho={20}/>}
              >
                {tema.nome.toUpperCase()}
              </DropdownItem>
            )
            }
            
          </DropdownMenu>
          </Dropdown>
        </div>
      </div> 
      
      </div>

    }
  </>

  )
}

