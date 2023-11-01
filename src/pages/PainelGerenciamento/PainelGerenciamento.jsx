import { useContext, useState } from "react";
import useGerenciadorContexto from "../../hooks/useGerenciadorContexto" 
import CardPergunta from "../../components/CardPergunta/CardPergunta";
import temaContexto from "../../context/TemaContexto";
import { Calendar, FolderNotchOpen, Folders, Plus } from "@phosphor-icons/react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { temas } from "../../data/temas";
import Icone from "../../components/Icone/Icone";
import { useEffect } from "react";
import CampoModais from "../../components/CampoModais/CampoModais";
import { useGerenciador } from "../../hooks/useGerenciador";
import CardTema from '../../components/CardTema/CardTema'


export default function PainelGerenciamento() {

  //* Contexto do tema - light / dark
  const {tema} = useContext(temaContexto)
  const foregroundColor = tema == "dark" ? "#ECEDEE" : "#11181C"

  //* Contexto gerenciamento de items - gerenciamento -> objeto / gerenciar -> função base para gerenciar
  const {gerenciamento, gerenciar} = useGerenciadorContexto()

  //* Hook com funções de gerenciamento(precisam da função base "gerenciar")
  const gerenciador = useGerenciador()

  //? Para Debbug
  useEffect(() => {
    console.log(gerenciamento)
  }, [gerenciamento])

  //* Armazena o item do menu de temas selecionado
  const [itemSelecionado, definirItemSelecionado] = useState('')

  //* Armazena o tema selecionado
  const [temaSelecionado, definirTemaSelecionado] = useState('todos')

  //* Temas possiveis para a filtragem
  const temasParaFiltragem = [
    {
      nome: "todos",
      icone: "Cards"
    },
    ...temas,
  ]

  const [painel, definirPainel] = useState("perguntas")

  const alternarPainel = () => {
    if(painel == "perguntas"){
      definirPainel('temas')
    }else {
      definirPainel('perguntas')
    }
  }

  const adicionarItem = () => {
    if(painel == 'perguntas'){
      gerenciador.adicionarPergunta(gerenciar)
    }else {
      gerenciador.adicionarTema(gerenciar)
    }
  }

  return (
    <div className="relative flex ">

      {/* Modais */}
      <CampoModais />

      {/* Botoes esquerdo versão desktop */}
      <div className="hidden w-16 lg:flex bg-content1 fixed bottom-[50%] translate-y-[50%] mx-10 flex-col justify-between items-center rounded-full ">
        <div className="flex flex-col justify-center h-32 ">
          {painel == 'perguntas' ? 
            <div className="hover:bg-content2 p-2 cursor-pointer rounded-full" onClick={() => alternarPainel()}>
              <Folders size={40} color="#fdfcfc" weight="fill" />
            </div>
            :
            <div className="bg-content2 p-2 cursor-pointer rounded-full" onClick={() => alternarPainel()}>
              <Folders size={40} color="#fdfcfc" weight="fill" />
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
        
          {painel == "perguntas" ?
            <>
              <h1 className="text-2xl sm:text-3xl font-bold my-5">
                Perguntas
                <span className="text-content6"> Online</span>
              </h1>
              {temaSelecionado == "todos" ? 
                 <CardPergunta cor={foregroundColor} tipo="gerenciamento" /> 
                :
                 <CardPergunta cor={foregroundColor} tipo="gerenciamento" filtro="tema" tema={temaSelecionado}/> 
              }
            </>
            :
            <>
              <h1 className="text-2xl sm:text-3xl font-bold my-5">
                Temas
                <span className="text-content6"> Online</span>
              </h1>
              <CardTema tipo="gerenciamento" />
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
              {(tema) => (
                <DropdownItem 
                  className="text-foreground"
                  key={tema.nome}
                  startContent={<Icone icone={tema.icone} tamanho={20} />}
                >
                  {tema.nome.toUpperCase()}
                </DropdownItem>
              )
              }
              
            </DropdownMenu>
          </Dropdown>
        }

        <div className="bg-content2 rounded-full p-4 hover:opacity-70 transition-all cursor-pointer">
          <Calendar size={35} color="#fdfcfc" weight="fill" />
        </div>
      </div>

      {/* Menus de ação mobile */}
      <div className="fixed bottom-0 bg-background w-full px-5 flex justify-between items-center lg:hidden">
        {painel == 'perguntas' ? 
          <div className="flex flex-1 justify-center cursor-pointer" onClick={() => alternarPainel()}>
            <div className="hover:bg-content2 rounded-full p-2">
              <Folders size={35} color="#fdfcfc" weight="fill" />
            </div>
          </div>
          :
          <div className="flex flex-1 justify-center cursor-pointer" onClick={() => alternarPainel()}>
            <div className="bg-content2 rounded-full p-2">
              <Folders size={35} color="#fdfcfc" weight="fill" />
            </div>
          </div>
        }
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

  )
}

