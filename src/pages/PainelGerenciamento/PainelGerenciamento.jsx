import { useContext, useEffect, useState } from "react";
import useGerenciadorContexto from "../../hooks/useGerenciadorContexto" 
import CardPergunta from "../../components/CardPergunta/CardPergunta";
import temaContexto from "../../context/TemaContexto";
import { FolderNotchOpen, Folders, MoonStars, Plus, SealQuestion, Sun, UserCircleGear } from "@phosphor-icons/react";
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tabs, Tab, Tooltip} from "@nextui-org/react";

import Icone from "../../components/Icone/Icone";
import CampoModais from "../../components/CampoModais/CampoModais";
import { useGerenciador } from "../../hooks/useGerenciador";
import CardTema from '../../components/CardTema/CardTema'
import { AuthContext } from "../../context/Auth/AuthProvider";
import CardColaboradores from "../../components/CardColaboradores/CardColaboradores";
import dataContexto from "../../context/Data/dataContexto";
import PesquisaContexto from "../../context/Pesquisa/PesquisaContexto";


export default function PainelGerenciamento() {

  const {idPesquisa} = useContext(PesquisaContexto)

  const {usuario} = useContext(AuthContext)

  const {quantasPerguntasNovas, temPerguntasNovas} = useContext(dataContexto)

  // Contexto do tema - light / dark
  const {tema} = useContext(temaContexto)
  const foregroundColor = tema == "dark" ? "#ECEDEE" : "#11181C"

  // Contexto gerenciamento de items - gerenciamento -> objeto / gerenciar -> função base para gerenciar
  const { gerenciar, definirBuscaColaboradores} = useGerenciadorContexto()

  // Hook com funções de gerenciamento(precisam da função base "gerenciar")
  const gerenciador = useGerenciador()

  const {dbTemas} = useContext(dataContexto)

  // Armazena o item do menu de temas selecionado
  const [itemSelecionado, definirItemSelecionado] = useState('')

  // Armazena o tema selecionado
  const [temaSelecionado, definirTemaSelecionado] = useState('todos')

  // Temas possiveis para a filtragem
  const [temasParaFiltragem, definirTemasParaFiltragem] = useState([]) 

  const [painel, definirPainel] = useState("perguntas")
  const [estadoDasPerguntas, definirEstadoDasPerguntas] = useState('Online')

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


  const alternarPainel = (painelDesejado) => {
    if(painel != painelDesejado){
      if(painelDesejado == 'colaboradores'){
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

  
  return (

    <div className="relative flex">

    {/* Modais */}
    <CampoModais />

    {/* Botoes esquerdo versão desktop */}
    <div className="hidden w-16 lg:flex bg-content1 fixed bottom-[50%] translate-y-[50%] mx-10 flex-col justify-between items-center rounded-full ">
      <div className="flex flex-col justify-center h-48 gap-2">

        {painel != 'temas' &&
          <Tooltip  content='Temas' color="success" className={`font-bold ${tema}`} placement="right" showArrow>
            <div className="hover:bg-content2 p-2 cursor-pointer rounded-full" onClick={() => alternarPainel('temas')}>
              <Folders size={40} color="#fdfcfc" weight="fill" />
            </div>
          </Tooltip>
        }

        {painel == 'temas' &&
          <Tooltip content='Voltar para perguntas' color="success" className={`font-bold ${tema}`} placement="right" showArrow>
            <div className="bg-content2 p-2 cursor-pointer rounded-full" onClick={() => alternarPainel('temas')}>
              <Folders size={40} color="#fdfcfc" weight="fill" />
            </div>
          </Tooltip>
          
        }

        {painel != 'sugestaoPerguntas' &&
            <Badge content={quantasPerguntasNovas} color="success" variant="shadow" className="font-bold " showOutline={false} isInvisible={!temPerguntasNovas}>
              <Tooltip content='Novas Perguntas' color="success" className={`font-bold ${tema}`} placement="right" showArrow>
                <div className="hover:bg-content2 p-2 cursor-pointer rounded-full" onClick={() => alternarPainel('sugestaoPerguntas')}>
                  <SealQuestion size={40} color="#f9f1f1" weight="fill" />
                </div>
              </Tooltip>
            </Badge>
        }

        {painel == 'sugestaoPerguntas' &&
            <Badge content={quantasPerguntasNovas} color="success" variant="shadow" className="font-bold " showOutline={false} isInvisible={!temPerguntasNovas}>
              <Tooltip content='Voltar para perguntas' color="success" className={`font-bold ${tema}`} placement="right" showArrow>
                <div className="bg-content2 p-2 cursor-pointer rounded-full" onClick={() => alternarPainel('sugestaoPerguntas')}>
                  <SealQuestion size={40} color="#f9f1f1" weight="fill" />
                </div>
              </Tooltip>
            </Badge>
        }

        {usuario && usuario.level == 2 && painel != 'colaboradores' &&
          <Tooltip content='Colaboradores' color="success" className={`font-bold ${tema}`} placement="right" showArrow>
            <div className="hover:bg-content2 rounded-full p-2 cursor-pointer" onClick={() => alternarPainel('colaboradores')}>
              <UserCircleGear size={40} color="#f9f1f1" weight="fill" />
            </div>
          </Tooltip>
          
        }

        {usuario && usuario.level == 2 && painel == 'colaboradores' &&
          <Tooltip content='Voltar para perguntas' color="success" className={`font-bold ${tema}`} placement="right" showArrow>
            <div className="bg-content2 rounded-full p-2 cursor-pointer" onClick={() => alternarPainel('colaboradores')}>
              <UserCircleGear size={40} color="#f9f1f1" weight="fill" />
            </div>
          </Tooltip>

        }
      </div>

      <Tooltip content='Adicionar' className={`text-foreground ${tema}`} placement="right">
        <div className="p-2 bg-content6 hover:bg-opacity-70 transition-all rounded-full flex items-center justify-center border-[10px] border-background2 cursor-pointer " onClick={() => adicionarItem()}>
          <Plus size={40} color="#fdfcfc" weight="bold" />
        </div>
      </Tooltip>
    </div>

    {/* Painel de perguntas */}
    <div className="w-full min-h-[100vh] lg:w-[900px] xl:w-[1250px] m-auto px-2 sm:px-20 flex flex-col ">
      
      {painel == 'perguntas' &&

        <div className="w-full flex xl:justify-end justify-center">
          <Tabs className="xl:absolute block xl:top-6 top-0 font-bold" variant="bordered" radius="full" 

            size="sm" 
            selectedKey={estadoDasPerguntas} 
            onSelectionChange={definirEstadoDasPerguntas}
          >
            <Tab key="Online" title={
              <div className="flex items-center space-x-2">
                <Sun  size={20} color="#f9f1f1" weight="fill" />
                <span>Perguntas Online</span>
              </div>
            }></Tab>
            <Tab key="Offline" title={
              <div className="flex items-center space-x-2">
                <MoonStars size={20} color="#f9f1f1" weight="fill" />
                <span>Perguntas Offline</span>
              </div>
            }></Tab>
          </Tabs>
        </div>

      }

      <div className="w-full flex flex-col items-center mb-20 ">
        {painel == "perguntas" &&
          <>
          {idPesquisa ?
            <>
              <h1 className="text-2xl sm:text-3xl font-bold my-5">
                <span className="text-content6">Resultado </span>
                Pesquisa
              </h1>
              <CardPergunta cor={foregroundColor} tipo="gerenciamento" filtro='pergunta' estado={estadoDasPerguntas} idPesquisa={idPesquisa}/>
            </>
            :
            <>
              <h1 className="text-2xl sm:text-3xl font-bold my-5">
                Perguntas
                {estadoDasPerguntas == 'Online' ?
                  <span className="text-content6"> {estadoDasPerguntas}</span>
                :
                  <span className="text-danger"> {estadoDasPerguntas}</span>
                }
                
              </h1>
              {temaSelecionado == "todos" ? 
                <CardPergunta cor={foregroundColor} tipo="gerenciamento" estado={estadoDasPerguntas}/> 
                : 
                <CardPergunta cor={foregroundColor} tipo="gerenciamento" estado={estadoDasPerguntas} filtro="tema" temaParaFiltro={temaSelecionado}/> 
              }
            </>
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

        {painel == 'sugestaoPerguntas' && 
          <>
            <h1 className="text-2xl sm:text-3xl font-bold my-5">
              <span className="text-content6">Novas </span> 
              Perguntas
            </h1>
            <CardPergunta cor={foregroundColor} tipo="gerenciamento" modelo='responder'/> 
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

    </div>

    {/* Menus de ação mobile */}
    <div className="fixed bottom-0 bg-background w-full px-5 flex justify-between items-center lg:hidden z-50">
      <div className="flex flex-1 justify-around">

        {painel != 'sugestaoPerguntas' &&
            <Badge content={quantasPerguntasNovas} color="success" variant="shadow" className="font-bold " showOutline={false} isInvisible={!temPerguntasNovas}>
              <div className="hover:bg-content2 p-2 cursor-pointer rounded-full" onClick={() => alternarPainel('sugestaoPerguntas')}>
                <SealQuestion size={35} color="#f9f1f1" weight="fill" />
              </div>
            </Badge>
        }

        {painel == 'sugestaoPerguntas' &&
            <Badge content={quantasPerguntasNovas} color="success" variant="shadow" className="font-bold " showOutline={false} isInvisible={!temPerguntasNovas}>
              <div className="bg-content2 p-2 cursor-pointer rounded-full" onClick={() => alternarPainel('sugestaoPerguntas')}>
                <SealQuestion size={35} color="#f9f1f1" weight="fill" />
              </div>
            </Badge>
          
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

      <div className="flex flex-1 justify-around items-center">
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
          {({tema, icone}) => (
            <DropdownItem 
              className="text-foreground"
              key={tema}
              startContent={<Icone icone={icone} tamanho={20}/>}
            >
              {tema.toUpperCase()}
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

