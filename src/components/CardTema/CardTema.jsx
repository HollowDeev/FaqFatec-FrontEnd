import MediaQuery from "react-responsive"

import Icone from "../Icone/Icone"
import { useContext } from "react"
import paginaHomeContexto from "../../context/PaginaHome/PaginaHomeContexto"
import P from 'prop-types'
import { GearSix, PencilSimpleLine, Trash } from "@phosphor-icons/react"
import { useGerenciador } from "../../hooks/useGerenciador"
import useGerenciadorContexto from "../../hooks/useGerenciadorContexto"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown"
import temaContexto from "../../context/TemaContexto"
import dataContexto from "../../context/Data/dataContexto"
import CardTemaSkeleton from "./CardTemaSkeleton"

const CardTema = ({tipo = 'visualizacao'}) => {

    const {tema: temaSistema} = useContext(temaContexto)

    
    const {dbTemas} = useContext(dataContexto)

    //* Contexto para definir o tema de visualização na PAGINA HOME
    const {definirTema} = useContext(paginaHomeContexto)

    const {gerenciar} = useGerenciadorContexto()
    const gerenciador = useGerenciador()

    const selecionar = (acao, tema) => {
        switch(acao){
            case 'editar':
                gerenciador.editarTema(gerenciar, tema)
        }
    }

   switch(tipo) {
        case 'visualizacao':
            
            return (
              <div className="flex gap-5 flex-wrap justify-center px-1">
                  {dbTemas != null ?
                    
                    <>
                        {dbTemas.map(({tema, icone, id}) => 
                        
                        <div className="w-36 h-36 sm:w-52 sm:h-52 bg-content2 rounded-2xl bg-opacity-60 p-5 text-center flex flex-col justify-between items-center hover:translate-y-[-20px] cursor-pointer transition-transform" key={id} onClick={() => definirTema(tema)}>
                                <MediaQuery maxWidth={640}>
                                    <Icone icone={icone} tamanho={70}/>
                                </MediaQuery>
                
                                <MediaQuery minWidth={640}>
                                    <Icone tema={tema} tamanho={100}/>
                                </MediaQuery>
                
                                <h1 className="text-2xl font-extrabold">{tema.toUpperCase()}</h1>
                            </div>
                        )}
                    </>

                    :

                    <CardTemaSkeleton />
                  
                  }
                  
              </div>
            )
        case 'gerenciamento':
            return (
                <div className="flex gap-5 flex-wrap justify-center px-1">
                    {dbTemas != null ?
                        <>
                            {dbTemas.map(({tema, icone, id}) => 
                        
                                <div className="w-36 h-36 sm:w-52 sm:h-52 bg-content2 rounded-2xl bg-opacity-60 sm:p-5 relative text-center flex flex-col justify-between items-center" key={id} onClick={() => definirTema(tema)}>
                                    
                                    <MediaQuery maxWidth={640}>
                                        <Icone icone={icone} tamanho={70} />
                                    </MediaQuery>
                    
                                    <MediaQuery minWidth={640}>
                                        <Dropdown className={`text-foreground ${temaSistema}`}>
                                                <DropdownTrigger >
                                                    <div className="absolute w-8 h-8 bg-content6 top-2 right-2 rounded-xl cursor-pointer flex justify-center items-center hover:bg-opacity-70 transition-all">
                                                        <GearSix size={24} color="#070707" weight="bold" />
                                                    </div>
                                                </DropdownTrigger>
                                                <DropdownMenu className={temaSistema} onAction={(acao) => selecionar(acao, {tema, icone, id})}>
                                                    <DropdownItem key="editar" startContent={<PencilSimpleLine size={20} color="#f9f1f1" weight="fill" />}>Editar</DropdownItem>
                                                    <DropdownItem key="excluir" className="text-danger"  startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
                                                </DropdownMenu>
                                        </Dropdown>
                                        <Icone icone={icone} tamanho={100}/>
                                    </MediaQuery>
                    
                                    <h1 className="text-2xl font-extrabold mx-1 sm:m-0">{tema.toUpperCase()}</h1>
                                
                                    
                                    <Dropdown className={`text-foreground ${temaSistema}`}>
                                        <DropdownTrigger >
                                            <div className=" w-full bg-content6 rounded-b-2xl py-1 sm:hidden">GERENCIAR</div>
                                        </DropdownTrigger>
                                        <DropdownMenu className={temaSistema} onAction={(acao) => selecionar(acao, tema)}>
                                            <DropdownItem key="editar" startContent={<PencilSimpleLine size={20} color="#f9f1f1" weight="fill" />}>Editar</DropdownItem>
                                            <DropdownItem key="excluir" className="text-danger"  startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            )}
                        </>
                        :
                        <CardTemaSkeleton />
                    }
                    
                </div>
              )
   }
}

CardTema.propTypes = {
    tipo: P.string
}

export default CardTema

