import { Accordion, AccordionItem, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { Books, Eye, EyeClosed, GearSix, PencilSimpleLine, Trash } from "@phosphor-icons/react"
import { perguntas } from "../../data/perguntas"
import PropTypes from 'prop-types'
import Icone from "../Icone/Icone"
import { useContext } from "react"
import temaContexto from "../../context/TemaContexto"
import { useGerenciador } from "../../hooks/useGerenciador"
import useGerenciadorContexto from "../../hooks/useGerenciadorContexto"
import dataContexto from "../../context/Data/dataContexto"
import CardPerguntaSkeleton from "./CardPerguntaSkeleton"
import { useActionsApi } from "../../hooks/useActionsApi"
import { AuthContext } from "../../context/Auth/AuthProvider"
import parse from 'html-react-parser';
import PesquisaContexto from "../../context/Pesquisa/PesquisaContexto"

CardPergunta.defaultProps = {
    limite: 0,
    filtro: 'nenhum',
    cor: '#771212',
    tipo: "visualizacao",
    modelo: 'edicao'
}

CardPergunta.propTypes = {
    limite: PropTypes.number,
    filtro: PropTypes.string,
    temaParaFiltro: PropTypes.string,
    cor: PropTypes.string,
    tipo: PropTypes.string,
    idPesquisa: PropTypes.number,
    modelo: PropTypes.string
}

export default function CardPergunta({ limite, temaParaFiltro, filtro, cor, tipo, idPesquisa, modelo }) {

    const { tema: temaSistema } = useContext(temaContexto)

    const {dbPerguntas, dbPerguntasNovas} = useContext(dataContexto)

    const {parametrosRequisicao, perguntasAtualizadas} = useContext(AuthContext)
    const actionsApi = useActionsApi()
    const {recarregarDados} = useContext(dataContexto)

    const { gerenciar } = useGerenciadorContexto()
    const gerenciador = useGerenciador()

    const {definirIdParaPesquisa} = useContext(PesquisaContexto)

    const visualizarPergunta = (id) => {
        definirIdParaPesquisa(id)
    }

    // Chamada no select de gerenciamento - Excluir / Editar pergunta
    const selecao = async(acao, pergunta) => {
        switch(acao){
            case 'editar':
                gerenciador.editarPerguntas(gerenciar, pergunta)
                break
            
            case 'excluir':
                await actionsApi.deletarPergunta(pergunta.id, parametrosRequisicao)
                recarregarDados()
                break

            case 'responder':
                gerenciador.responderPergunta(gerenciar, pergunta)
        }
    }

    switch (tipo) {
        case "visualizacao":
            switch (filtro) {
                case "limite":

                    return (
                        <>
                            {dbPerguntas != null ?
                                <Accordion variant="splitted" itemClasses={{ title: "text-lg sm:text-2xl font-bold", base: "group-[.is-splitted]:bg-content2 group-[.is-splitted]:backdrop-blur-sm group-[.is-splitted]:rounded-2xl group-[.is-splitted]:bg-opacity-60" }} >
                                        {
                                            dbPerguntas.filter((pergunta, índice) => índice < limite).map((pergunta) => (
                                                <AccordionItem
                                                    key={pergunta.id}
                                                    title={pergunta.pergunta}
                                                    subtitle={pergunta.tema.toUpperCase()}
                                                    startContent={
                                                        <Icone icone={pergunta.icone} cor={cor} tamanho={50} />
                                                    }

                                                    indicator={
                                                        ({ isOpen }) => isOpen
                                                            ?
                                                            <Eye size={25} color={temaSistema == "dark" ? '#ffff' : "#000"} weight="bold" />
                                                            :
                                                            <EyeClosed size={25} color={temaSistema == "dark" ? '#ffff' : "#000"} weight="bold" />
                                                    }
                                                    disableIndicatorAnimation
                                                >
                                                <div>
                                                    {parse(pergunta.resposta)}
                                                </div>
                                                </AccordionItem>
                                            ))
                                        }
                                </Accordion> 
                            :
                            <CardPerguntaSkeleton />
                            }
                        </>
                    )

                case 'tema':
                    return (
                        <>
                            {dbPerguntas != null ?
                                <Accordion variant="splitted" itemClasses={{ title: "text-2xl font-bold", base: "group-[.is-splitted]:bg-content2 group-[.is-splitted]:backdrop-blur-sm group-[.is-splitted]:rounded-2xl group-[.is-splitted]:bg-opacity-60" }}>
                                    {
                                        dbPerguntas.filter(({tema}) => tema == temaParaFiltro).map(({tema, pergunta, resposta, icone, id}) => (
                                            <AccordionItem
                                                key={id}
                                                title={pergunta}
                                                subtitle={tema.toUpperCase()}
                                                startContent={
                                                    <Icone icone={icone} cor={cor} tamanho={50} />
                                                }
                                                indicator={
                                                    ({ isOpen }) => isOpen
                                                        ?
                                                        <Eye size={25} color={temaSistema == "dark" ? '#ffff' : "#000"} weight="bold" />
                                                        :
                                                        <EyeClosed size={25} color={temaSistema == "dark" ? '#ffff' : "#000"} weight="bold" />
                                                }
                                                disableIndicatorAnimation
                                            >
                                                <div>
                                                    {parse(resposta)}
                                                </div>
                                            </AccordionItem>
                                        ))
                                    }
                                </Accordion>
                                :
                                <CardPerguntaSkeleton />
                            }
                        </>
                    )

                case 'pergunta':
                return (
                    <>
                        {dbPerguntas != null ?
                            <Accordion variant="splitted" itemClasses={{ title: "text-2xl font-bold", base: "group-[.is-splitted]:bg-content2 group-[.is-splitted]:backdrop-blur-sm group-[.is-splitted]:rounded-2xl group-[.is-splitted]:bg-opacity-60" }}>
                                {
                                    dbPerguntas.filter(({id}) => id == idPesquisa).map(({tema, pergunta, resposta, icone, id}) => (
                                        <AccordionItem
                                            key={id}
                                            title={pergunta}
                                            subtitle={tema.toUpperCase()}
                                            startContent={
                                                <Icone icone={icone} cor={cor} tamanho={50} />
                                            }
                                            indicator={
                                                ({ isOpen }) => isOpen
                                                    ?
                                                    <Eye size={25} color={temaSistema == "dark" ? '#ffff' : "#000"} weight="bold" />
                                                    :
                                                    <EyeClosed size={25} color={temaSistema == "dark" ? '#ffff' : "#000"} weight="bold" />
                                            }
                                            disableIndicatorAnimation
                                        >
                                            <div>
                                                {parse(resposta)}
                                            </div>
                                        </AccordionItem>
                                    ))
                                }
                            </Accordion>
                            :
                            <CardPerguntaSkeleton />
                        }
                    </>
                )               

                case 'nenhum':
                    return (
                        <>
                            {dbPerguntas != null ? (
                            <Accordion variant="splitted" itemClasses={{ title: "text-2xl font-bold", base: "group-[.is-splitted]:bg-content2 group-[.is-splitted]:backdrop-blur-sm group-[.is-splitted]:rounded-2xl group-[.is-splitted]:bg-opacity-60" }}>
                                {
                                    perguntas.map(({ id, titulo, tema, resposta }) => (
                                        <AccordionItem
                                            key={id}
                                            title={titulo}
                                            subtitle={tema.toUpperCase()}
                                            startContent={
                                                <>
                                                    <Icone tema={tema} cor={cor} tamanho={50} />

                                                </>

                                            }

                                            indicator={
                                                ({ isOpen }) => isOpen
                                                    ?
                                                    <Eye size={25} color="#ffffff" weight="bold" />
                                                    :
                                                    <EyeClosed size={25} color="#ffffff" weight="bold" />
                                            }
                                            disableIndicatorAnimation
                                        >
                                            <div>
                                                {parse(resposta)}
                                            </div>
                                        </AccordionItem>
                                    ))
                                }
                            </Accordion>)
                            :
                            <CardPerguntaSkeleton />
                            }
                        </>
                    )


            }
            break


        case "gerenciamento":
            switch(modelo){
                case 'edicao':
                    switch (filtro) {
                        case "nenhum":
                            return (
                                <>
                                    {dbPerguntas != null ?
                                        <div className="w-full flex flex-col gap-10" key='pai'>

                                            {dbPerguntas.map(({pergunta, id, icone, tema, resposta}) => (
                                                <>
                                                    <div className="w-full h-auto bg-content2 bg-opacity-60 rounded-2xl flex flex-col justify-between gap-5 p-3 static break-words" key={id}>

                                                        <div className="flex items-center h-auto gap-3 relative">
                                                            <div>
                                                                <Icone icone={icone} cor={cor} tamanho={50} />
                                                            </div>
                                                            <div>
                                                                <h1 className="text-2xl font-bold">{pergunta}</h1>
                                                                <p className="opacity-50 font-light">{tema}</p>
                                                            </div>
                                                            <Dropdown className={`text-foreground ${temaSistema}`}>
                                                                <DropdownTrigger>
                                                                    <Button isIconOnly color="success" className="hidden sm:flex absolute right-2 z-0" >
                                                                        <GearSix size={24} color="#070707" weight="bold" />
                                                                    </Button>
                                                                </DropdownTrigger>
                                                                <DropdownMenu onAction={(acao) => selecao(acao, {pergunta, id, icone, tema, resposta})}>
                                                                    <DropdownItem key='editar' startContent={<PencilSimpleLine size={20} color="#f9f1f1" weight="fill" />}>Editar</DropdownItem>
                                                                    <DropdownItem key="excluir"  className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
                                                                </DropdownMenu>
                                                            </Dropdown>
                                                        </div>

                                                        <div>
                                                            {parse(resposta)}
                                                        </div>

                                                        
                                                        <Dropdown className={`text-foreground ${temaSistema}`}>
                                                                <DropdownTrigger>
                                                                    <div className="bg-content6 p-2 text-center rounded-b-xl text-xl font-bold text-background2 sm:hidden">
                                                                        GERENCIAR
                                                                    </div>
                                                                </DropdownTrigger>
                                                                <DropdownMenu className={tema} onAction={(acao) => selecao(acao, {pergunta, id, icone, tema, resposta})}>
                                                                    <DropdownItem key='editar' startContent={<PencilSimpleLine size={20} color="#f9f1f1" weight="fill" />}>Editar</DropdownItem>
                                                                    <DropdownItem key="excluir"  className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
                                                                </DropdownMenu>
                                                            </Dropdown>
                                                    </div>
                                                </>
                                            ))
                                            }

                                        </div>
                                        :
                                        <CardPerguntaSkeleton />
                                    }
                                </>
                            )

                        case "tema":
                            return (
                                <>
                                    {dbPerguntas != null ?
                                    
                                        <div className="w-full flex flex-col gap-10">

                                            {dbPerguntas.filter(({tema}) => tema == temaParaFiltro).map(({pergunta, id, icone, tema, resposta}) => (
                                                <>
                                                    <div className="w-full h-auto bg-content2 bg-opacity-60 rounded-2xl flex flex-col justify-between gap-5 p-3 static break-words" 
                                                        key={id}
                                                    >

                                                        <div className="flex items-center h-auto gap-3 relative">
                                                            <div>
                                                                <Icone icone={icone} cor={cor} tamanho={50} />
                                                            </div>
                                                            <div>
                                                                <h1 className="text-2xl font-bold">{pergunta}</h1>
                                                                <p className="opacity-50 font-light">{tema}</p>
                                                            </div>
                                                            <Dropdown className={`text-foreground ${temaSistema}`}>
                                                                <DropdownTrigger>
                                                                    <Button isIconOnly color="success" className="hidden sm:flex absolute right-2 z-0" >
                                                                        <GearSix size={24} color="#070707" weight="bold" />
                                                                    </Button>
                                                                </DropdownTrigger>
                                                                <DropdownMenu className={tema} onAction={(acao) => selecao(acao, {pergunta, id, icone, tema, resposta})}>
                                                                    <DropdownItem key='editar' startContent={<PencilSimpleLine size={20} color="#f9f1f1" weight="fill" />}>Editar</DropdownItem>
                                                                    <DropdownItem key="excluir"  className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
                                                                </DropdownMenu>
                                                            </Dropdown>
                                                        </div>

                                                        <div>
                                                            {parse(resposta)}
                                                        </div>


                                                        <Dropdown className={`text-foreground ${temaSistema}`}>
                                                                <DropdownTrigger>
                                                                    <div className="bg-content6 p-2 text-center rounded-b-xl text-xl font-bold text-background2 sm:hidden">
                                                                        GERENCIAR
                                                                    </div>
                                                                </DropdownTrigger>
                                                                <DropdownMenu className={tema} onAction={(acao) => selecao(acao, {pergunta, id, icone, tema, resposta})}>
                                                                    <DropdownItem key='editar' startContent={<PencilSimpleLine size={20} color="#f9f1f1" weight="fill" />}>Editar</DropdownItem>
                                                                    <DropdownItem key="excluir"  className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
                                                                </DropdownMenu>
                                                            </Dropdown>
                                                    </div>
                                                </>
                                            ))
                                            }

                                        </div>
                                        :
                                        <CardPerguntaSkeleton />
                                    }
                                </>
                            )

                        case "pergunta":
                        return (
                            <>
                                {dbPerguntas != null ?
                                
                                    <div className="w-full flex flex-col gap-10">
                                        {dbPerguntas.filter(({id}) => id == idPesquisa).map(({pergunta, id, icone, tema, resposta}) => (
                                            <>
                                                <div className="w-full h-auto bg-content2 bg-opacity-60 rounded-2xl flex flex-col justify-between gap-5 p-3 static break-words" 
                                                    key={id}
                                                >

                                                    <div className="flex items-center h-auto gap-3 relative">
                                                        <div>
                                                            <Icone icone={icone} cor={cor} tamanho={50} />
                                                        </div>
                                                        <div>
                                                            <h1 className="text-2xl font-bold">{pergunta}</h1>
                                                            <p className="opacity-50 font-light">{tema}</p>
                                                        </div>
                                                        <Dropdown className={`text-foreground ${temaSistema}`}>
                                                            <DropdownTrigger>
                                                                <Button isIconOnly color="success" className="hidden sm:flex absolute right-2 z-0" >
                                                                    <GearSix size={24} color="#070707" weight="bold" />
                                                                </Button>
                                                            </DropdownTrigger>
                                                            <DropdownMenu className={tema} onAction={(acao) => selecao(acao, {pergunta, id, icone, tema, resposta})}>
                                                                <DropdownItem key='editar' startContent={<PencilSimpleLine size={20} color="#f9f1f1" weight="fill" />}>Editar</DropdownItem>
                                                                <DropdownItem key="excluir"  className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </div>

                                                    <div>
                                                        {parse(resposta)}
                                                    </div>


                                                    <Dropdown className={`text-foreground ${temaSistema}`}>
                                                            <DropdownTrigger>
                                                                <div className="bg-content6 p-2 text-center rounded-b-xl text-xl font-bold text-background2 sm:hidden">
                                                                    GERENCIAR
                                                                </div>
                                                            </DropdownTrigger>
                                                            <DropdownMenu className={tema} onAction={(acao) => selecao(acao, {pergunta, id, icone, tema, resposta})}>
                                                                <DropdownItem key='editar' startContent={<PencilSimpleLine size={20} color="#f9f1f1" weight="fill" />}>Editar</DropdownItem>
                                                                <DropdownItem key="excluir"  className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                </div>
                                            </>
                                        ))
                                        }

                                    </div>
                                    :
                                    <CardPerguntaSkeleton />
                                }
                            </>
                        )
                    }
                break

                case 'responder':
                    case 'nenhum':
                        return (
                            <>
                                {dbPerguntasNovas != null ?
                                    <div className="w-full flex flex-col gap-10" key='pai'>

                                        {dbPerguntasNovas.map(({pergunta, id}) => (
                                            <>
                                                <div className="w-full h-auto bg-content2 bg-opacity-60 rounded-2xl flex flex-col justify-between gap-5 p-3 static break-words" key={id}>

                                                    <div className="flex items-center h-auto gap-3 relative">
                                                        <div>
                                                            <Books size={50} color="#f9f1f1" />
                                                        </div>
                                                        <div>
                                                            <h1 className="text-2xl font-bold">{pergunta}</h1>
                                                        </div>
                                                        <Dropdown className={`text-foreground ${temaSistema}`}>
                                                            <DropdownTrigger>
                                                                <Button isIconOnly color="success" className="hidden sm:flex absolute right-2 z-0" >
                                                                    <GearSix size={24} color="#070707" weight="bold" />
                                                                </Button>
                                                            </DropdownTrigger>
                                                            <DropdownMenu onAction={(acao) => selecao(acao, {pergunta, id})}>
                                                                <DropdownItem key='responder' startContent={<PencilSimpleLine size={20} color="#f9f1f1" weight="fill" />}>Responder</DropdownItem>
                                                                <DropdownItem key="excluir"  className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </div>

                                                    
                                                    <Dropdown className={`text-foreground ${temaSistema}`}>
                                                            <DropdownTrigger>
                                                                <div className="bg-content6 p-2 text-center rounded-b-xl text-xl font-bold text-background2 sm:hidden">
                                                                    GERENCIAR
                                                                </div>
                                                            </DropdownTrigger>
                                                            <DropdownMenu className={temaSistema} onAction={(acao) => selecao(acao, {pergunta, id})}>
                                                                <DropdownItem key='responder' startContent={<PencilSimpleLine size={20} color="#f9f1f1" weight="fill" />}>Responder</DropdownItem>
                                                                <DropdownItem key="excluir"  className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                </div>
                                            </>
                                        ))
                                        }

                                    </div>
                                    :
                                    <CardPerguntaSkeleton />
                                }
                            </>
                        )
            }
            break

        case 'notificacao':
            return (
                <>
                    {perguntasAtualizadas != null ?
                        <div className="text-lg sm:text-2xl font-bold flex flex-col gap-3" key='pai'>
                                {
                                    perguntasAtualizadas.map(({pergunta, id}) => (
                                        <div className="w-full h-auto bg-content2 bg-opacity-50 backdrop-blur-sm rounded-2xl flex justify-between gap-5 p-3 static break-words hover:translate-y-1 transition-all cursor-pointer" key={id} onClick={() => visualizarPergunta(id)}>

                                            <div className="flex items-center h-auto gap-3 relative">
                                                <div>
                                                    <Books size={36} color="#f9f1f1" />
                                                </div>
                                                <div>
                                                    <h1 className="text-2xl font-bold">{pergunta}</h1>
                                                </div>
                                            </div>
                                            <div className="p-1 bg-content6 rounded-xl flex items-center">
                                                <Eye size={25} color="#0D0D0D" weight="fill" />
                                            </div>

                                        </div>
                                    ))
                                }
                        </div> 
                    :
                    <CardPerguntaSkeleton />
                    }
                </>
            )

    }

}


