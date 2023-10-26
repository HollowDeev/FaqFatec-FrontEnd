import { useContext, useState } from "react";
import CardPergunta from "../../components/CardPergunta/CardPergunta";
import temaContexto from "../../context/TemaContexto";
import { Calendar, FolderNotchOpen, Folders, Plus } from "@phosphor-icons/react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { temas } from "../../data/temas";
import Icone from "../../components/Icone/Icone";

export default function PainelGerenciamento() {

  const {tema} = useContext(temaContexto)

  const foregroundColor = tema == "dark" ? "#ECEDEE" : "#11181C"

  const [itemSelecionado, definirItemSelecionado] = useState('')
  const [temaSelecionado, definirTemaSelecionado] = useState('todos')

  const temasParaFiltragem = [
    {
      nome: "todos",
      icone: "Cards"
    },
    ...temas,
  ]

  return (
    <div className="relative flex ">

      {/* Botoes esquerdo versão desktop */}
      <div className="hidden w-16 lg:flex bg-content1 fixed bottom-[50%] translate-y-[50%] mx-10 flex-col justify-between items-center rounded-full ">
        <div className="flex flex-col justify-center h-32 ">
          <div className="hover:bg-content2 p-2 cursor-pointer rounded-full">
            <Folders size={40} color="#fdfcfc" weight="fill" />
          </div>
        </div>

        <div className="p-2 bg-content6 hover:bg-opacity-70 transition-all rounded-full flex items-center justify-center border-[10px] border-background2 cursor-pointer ">
          <Plus size={40} color="#fdfcfc" weight="bold" />
        </div>
      </div>

      {/* Painel de perguntas */}
      <div className="w-full lg:w-[900px] xl:w-[1250px] m-auto px-2 sm:px-20 flex flex-col ">
    
        <div className="w-full flex flex-col items-center mb-20">
          <h1 className="text-2xl sm:text-3xl font-bold my-5">
            Perguntas
            <span className="text-content6"> Online</span>
          </h1>

          {temaSelecionado == "todos" ? 
          
            <CardPergunta cor={foregroundColor} tipo="gerenciamento" /> 
            :
            <CardPergunta cor={foregroundColor} tipo="gerenciamento" filtro="tema" tema={temaSelecionado}/> 
          }
        </div>
      </div>

      {/* Botoes direito versão desktop */}
      <div className="hidden lg:flex fixed bottom-[50%] translate-y-[50%] right-0 mx-10 flex-col justify-between items-center gap-10">

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

        <div className="bg-content2 rounded-full p-4 hover:opacity-70 transition-all cursor-pointer">
          <Calendar size={35} color="#fdfcfc" weight="fill" />
        </div>
      </div>

      {/* Menus de ação mobile */}
      <div className="fixed bottom-0 bg-background w-full px-5 flex justify-between items-center lg:hidden">
        <div className="flex flex-1 justify-center">
          <Folders size={35} color="#fdfcfc" weight="fill" />
        </div>
        <div className="p-2 bg-content6 rounded-full relative bottom-8 border-8 border-background ">
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
                startContent={<Icone icone={tema.icone} tamanho={20} />}
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

