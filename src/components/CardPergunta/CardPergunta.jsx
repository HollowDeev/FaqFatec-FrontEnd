import { Accordion, AccordionItem, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { Books, Eye, EyeClosed, GearSix, PencilSimpleLine, ToggleLeft, Trash } from "@phosphor-icons/react"
import PropTypes from 'prop-types'
import Icone from "../Icone/Icone"
import { useContext, useEffect, useState } from "react"
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
    modelo: PropTypes.string,
    estado: PropTypes.string
}

export default function CardPergunta({ limite, temaParaFiltro, filtro, cor, tipo, idPesquisa, modelo, estado }) {

    const { tema: temaSistema, foreground } = useContext(temaContexto)

    const { dbPerguntasOnline, dbPerguntasOffline, dbPerguntasNovas, dbTemas } = useContext(dataContexto)
    const [dbPerguntas, definirDbPerguntas] = useState(dbPerguntasOnline)

    const { parametrosRequisicao, perguntasAtualizadas, removerUmaPerguntaAtualizada } = useContext(AuthContext)
    const actionsApi = useActionsApi()

    const { gerenciar } = useGerenciadorContexto()
    const gerenciador = useGerenciador()

    const { definirIdParaPesquisa } = useContext(PesquisaContexto)

    // Marcar pergunta das notificacoes como visualizada
    const visualizarPergunta = async (id) => {
        definirIdParaPesquisa(id)
        removerUmaPerguntaAtualizada(id)
        await actionsApi.marcarPerguntaVisualizada(id, parametrosRequisicao)
    }

    // Chamada no select de gerenciamento - Excluir / Editar pergunta
    const selecao = async (acao, pergunta) => {
        var tema
        switch (acao) {
            case 'editar':
                gerenciador.editarPerguntas(gerenciar, pergunta, estado)
                break

            case 'excluir': {
                const alerta = {
                    tipo: 'alerta',
                    titulo: 'Realmente deseja Excluir?',
                    mensagem: 'Essa pergunta será removida PERMANENTEMENTE do sistema, tem certeza que deseja remover? Você pode optar por deixa-la offline caso não queira que ela apareca para os usuarios.',
                    funcao: 'excluirPergunta',
                    dadosFuncao: pergunta.id
                }
                gerenciador.exibirAlerta(gerenciar, alerta)
                break
            }


            case 'responder':
                gerenciador.responderPergunta(gerenciar, pergunta)
                break

            case 'tornarOffline': {
                tema = dbTemas.filter((tema) => tema.tema == pergunta.tema).map((tema) => tema.id.toString())
                const alerta = {
                    tipo: 'alerta',
                    titulo: 'Realmente deseja deixar essa pergunta Offline?',
                    mensagem: 'Essa pergunta ficará offline e DEIXARA DE APARECER para os usuarios que acessarem o sistema',
                    funcao: 'mudarEstadoPergunta',
                    dadosFuncao: {
                        pergunta: pergunta.pergunta,
                        resposta: pergunta.resposta,
                        estado: 0,
                        tema_id: Number(tema[0]),
                        id: pergunta.id
                    }
                }

                gerenciador.exibirAlerta(gerenciar, alerta)
                break
            }


            case 'tornarOnline': {
                tema = dbTemas.filter((tema) => tema.tema == pergunta.tema).map((tema) => tema.id.toString())
                const alerta = {
                    tipo: 'alerta',
                    titulo: 'Realmente deseja deixar essa pergunta Online?',
                    mensagem: 'Essa pergunta ficará online e APARECERA para todos os usuarios que acessarem o sistema',
                    funcao: 'mudarEstadoPergunta',
                    dadosFuncao: {
                        pergunta: pergunta.pergunta,
                        resposta: pergunta.resposta,
                        estado: 1,
                        tema_id: Number(tema[0]),
                        id: pergunta.id
                    }
                }

                gerenciador.exibirAlerta(gerenciar, alerta)
                break
            }
        }
    }

    useEffect(() => {
        switch (estado) {
            case 'Online':
                definirDbPerguntas(dbPerguntasOnline)
                break
            case 'Offline':
                definirDbPerguntas(dbPerguntasOffline)
        }
    }, [estado, dbPerguntasOnline, dbPerguntasOffline])

    const format = (text) => {
        const linkRegex = /(https?:\/\/[^\s]+[\w])/g;
        const splitText = text.split(linkRegex);

        return splitText.map((part, index) => {
            if (part.match(linkRegex)) {
              return `<a key=${index} href=${part} target="_blank" rel="noopener noreferrer" className='text-content5 font-bold'>${part}</a>`;
            } else {
              return part;
            }
          }).join('');
    };

    switch (tipo) {
        case "visualizacao":
            switch (filtro) {
                case "limite":

                    return (
                        <>
                            {dbPerguntasOnline != null ?
                                <Accordion variant="splitted" itemClasses={{ title: "text-lg sm:text-2xl font-bold", base: "group-[.is-splitted]:bg-content2 group-[.is-splitted]:backdrop-blur-sm group-[.is-splitted]:rounded-2xl group-[.is-splitted]:bg-opacity-60" }} >
                                    {
                                        dbPerguntasOnline.filter((pergunta, índice) => índice < limite).map((pergunta) => (
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
                                                    {parse(format(pergunta.resposta))}
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
                            {dbPerguntasOnline != null ?
                                <Accordion variant="splitted" itemClasses={{ title: "text-2xl font-bold", base: "group-[.is-splitted]:bg-content2 group-[.is-splitted]:backdrop-blur-sm group-[.is-splitted]:rounded-2xl group-[.is-splitted]:bg-opacity-60" }}>
                                    {
                                        dbPerguntasOnline.filter(({ tema }) => tema == temaParaFiltro).map(({ tema, pergunta, resposta, icone, id }) => (
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
                                                    {parse(format(resposta))}
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
                            {dbPerguntasOnline != null ?
                                <Accordion variant="splitted" itemClasses={{ title: "text-2xl font-bold", base: "group-[.is-splitted]:bg-content2 group-[.is-splitted]:backdrop-blur-sm group-[.is-splitted]:rounded-2xl group-[.is-splitted]:bg-opacity-60" }}>
                                    {
                                        dbPerguntasOnline.filter(({ id }) => id == idPesquisa).map(({ tema, pergunta, resposta, icone, id }) => (
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
                                                    {parse(format(resposta))}
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
                            {dbPerguntasOnline != null ? (
                                <Accordion variant="splitted" itemClasses={{ title: "text-2xl font-bold", base: "group-[.is-splitted]:bg-content2 group-[.is-splitted]:backdrop-blur-sm group-[.is-splitted]:rounded-2xl group-[.is-splitted]:bg-opacity-60" }}>
                                    {
                                        dbPerguntasOnline.map(({ id, titulo, tema, resposta }) => (
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
                                                    {parse(format(resposta))}
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
            switch (modelo) {
                case 'edicao':
                    switch (filtro) {
                        case "nenhum":
                            return (
                                <>
                                    {dbPerguntas != null ?
                                        <div className="w-full flex flex-col gap-10" key='pai'>

                                            {dbPerguntas.map(({ pergunta, id, icone, tema, resposta }) => (
                                                <>
                                                    <div className="w-full h-auto bg-content2 bg-opacity-40 backdrop-blur-sm rounded-2xl flex flex-col justify-between gap-5 p-3 static break-words" key={id}>

                                                        <div className="flex items-center h-auto gap-3 relative">
                                                            <div>
                                                                <Icone icone={icone} cor={cor} tamanho={50} />
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-5">
                                                                    <h1 className="text-2xl font-bold">{pergunta}</h1>
                                                                    {estado == 'Offline' && <Chip variant="dot" color="danger" className="hidden lg:flex">Offline</Chip>}
                                                                </div>
                                                                <p className="opacity-50 font-light">{tema}</p>
                                                                {estado == 'Offline' && <Chip variant="dot" color="danger" className="lg:hidden">Offline</Chip>}
                                                            </div>
                                                            <Dropdown className={`text-foreground ${temaSistema}`}>
                                                                <DropdownTrigger>
                                                                    <Button isIconOnly color={estado == 'Online' ? "success" : "danger"} className="hidden sm:flex absolute right-2 z-0" >
                                                                        <GearSix size={24} color="#070707" weight="bold" />
                                                                    </Button>
                                                                </DropdownTrigger>
                                                                <DropdownMenu onAction={(acao) => selecao(acao, { pergunta, id, icone, tema, resposta })}>
                                                                    <DropdownItem key='editar' startContent={<PencilSimpleLine size={20} color={foreground} weight="fill" />}>Editar</DropdownItem>
                                                                    <DropdownItem
                                                                        key={estado == 'Online' ? "tornarOffline" : 'tornarOnline'}
                                                                        startContent={<ToggleLeft size={20} color={foreground} weight="fill" />}
                                                                    >
                                                                        {estado == 'Online' ? "Deixar Offline" : 'Deixar Online'}
                                                                    </DropdownItem>

                                                                    <DropdownItem key="excluir" className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
                                                                </DropdownMenu>
                                                            </Dropdown>
                                                        </div>

                                                        <div>
                                                            {parse(format(resposta))}
                                                        </div>


                                                        <Dropdown className={`text-foreground ${temaSistema}`}>
                                                            <DropdownTrigger>
                                                                <div className={` ${estado == 'Online' ? "bg-content6 text-background2" : "bg-content5 text-white"} p-2 text-center rounded-b-xl text-xl font-bold sm:hidden`}>
                                                                    GERENCIAR
                                                                </div>
                                                            </DropdownTrigger>
                                                            <DropdownMenu className={tema} onAction={(acao) => selecao(acao, { pergunta, id, icone, tema, resposta })}>
                                                                <DropdownItem key='editar' startContent={<PencilSimpleLine size={20} color={foreground} weight="fill" />}>Editar</DropdownItem>
                                                                <DropdownItem key="excluir" className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
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

                                            {dbPerguntas.filter(({ tema }) => tema == temaParaFiltro).map(({ pergunta, id, icone, tema, resposta }) => (
                                                <>
                                                    <div className="w-full h-auto bg-content2 bg-opacity-40 backdrop-blur-sm rounded-2xl flex flex-col justify-between gap-5 p-3 static break-words"
                                                        key={id}
                                                    >

                                                        <div className="flex items-center h-auto gap-3 relative">
                                                            <div>
                                                                <Icone icone={icone} cor={cor} tamanho={50} />
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-5">
                                                                    <h1 className="text-2xl font-bold">{pergunta}</h1>
                                                                    {estado == 'Offline' && <Chip variant="dot" color="danger">Offline</Chip>}
                                                                </div>
                                                                <p className="opacity-50 font-light">{tema}</p>
                                                            </div>
                                                            <Dropdown className={`text-foreground ${temaSistema}`}>
                                                                <DropdownTrigger>
                                                                    <Button isIconOnly color={estado == 'Online' ? "success" : "danger"} className="hidden sm:flex absolute right-2 z-0" >
                                                                        <GearSix size={24} color="#070707" weight="bold" />
                                                                    </Button>
                                                                </DropdownTrigger>
                                                                <DropdownMenu className={tema} onAction={(acao) => selecao(acao, { pergunta, id, icone, tema, resposta })}>
                                                                    <DropdownItem key='editar' startContent={<PencilSimpleLine size={20} color={foreground} weight="fill" />}>Editar</DropdownItem>
                                                                    <DropdownItem key="excluir" className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
                                                                </DropdownMenu>
                                                            </Dropdown>
                                                        </div>

                                                        <div>
                                                            {parse(format(resposta))}
                                                        </div>


                                                        <Dropdown className={`text-foreground ${temaSistema}`}>
                                                            <DropdownTrigger>
                                                                <div className="bg-content6 p-2 text-center rounded-b-xl text-xl font-bold text-background2 sm:hidden">
                                                                    GERENCIAR
                                                                </div>
                                                            </DropdownTrigger>
                                                            <DropdownMenu className={tema} onAction={(acao) => selecao(acao, { pergunta, id, icone, tema, resposta })}>
                                                                <DropdownItem key='editar' startContent={<PencilSimpleLine size={20} color={foreground} weight="fill" />}>Editar</DropdownItem>
                                                                <DropdownItem key="excluir" className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
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
                                            {dbPerguntas.filter(({ id }) => id == idPesquisa).map(({ pergunta, id, icone, tema, resposta }) => (
                                                <>
                                                    <div className="w-full h-auto bg-content2 bg-opacity-40 backdrop-blur-sm rounded-2xl flex flex-col justify-between gap-5 p-3 static break-words"
                                                        key={id}
                                                    >

                                                        <div className="flex items-center h-auto gap-3 relative">
                                                            <div>
                                                                <Icone icone={icone} cor={cor} tamanho={50} />
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-5">
                                                                    <h1 className="text-2xl font-bold">{pergunta}</h1>
                                                                    {estado == 'Offline' && <Chip variant="dot" color="danger">Offline</Chip>}
                                                                </div>
                                                                <p className="opacity-50 font-light">{tema}</p>
                                                            </div>
                                                            <Dropdown className={`text-foreground ${temaSistema}`}>
                                                                <DropdownTrigger>
                                                                    <Button isIconOnly color={estado == 'Online' ? "success" : "danger"} className="hidden sm:flex absolute right-2 z-0" >
                                                                        <GearSix size={24} color="#070707" weight="bold" />
                                                                    </Button>
                                                                </DropdownTrigger>
                                                                <DropdownMenu className={tema} onAction={(acao) => selecao(acao, { pergunta, id, icone, tema, resposta })}>
                                                                    <DropdownItem key='editar' startContent={<PencilSimpleLine size={20} color={foreground} weight="fill" />}>Editar</DropdownItem>
                                                                    <DropdownItem key="excluir" className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
                                                                </DropdownMenu>
                                                            </Dropdown>
                                                        </div>

                                                        <div>
                                                            {parse(format(resposta))}
                                                        </div>


                                                        <Dropdown className={`text-foreground ${temaSistema}`}>
                                                            <DropdownTrigger>
                                                                <div className="bg-content6 p-2 text-center rounded-b-xl text-xl font-bold text-background2 sm:hidden">
                                                                    GERENCIAR
                                                                </div>
                                                            </DropdownTrigger>
                                                            <DropdownMenu className={tema} onAction={(acao) => selecao(acao, { pergunta, id, icone, tema, resposta })}>
                                                                <DropdownItem key='editar' startContent={<PencilSimpleLine size={20} color={foreground} weight="fill" />}>Editar</DropdownItem>
                                                                <DropdownItem key="excluir" className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
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

                                    {dbPerguntasNovas.map(({ pergunta, id }) => (
                                        <>
                                            <div className="w-full h-auto bg-content2 bg-opacity-40 backdrop-blur-sm rounded-2xl flex flex-col justify-between gap-5 p-3 static break-words" key={id}>

                                                <div className="flex items-center h-auto gap-3 relative">
                                                    <div>
                                                        <Books size={50} color={foreground} />
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
                                                        <DropdownMenu onAction={(acao) => selecao(acao, { pergunta, id })}>
                                                            <DropdownItem key='responder' startContent={<PencilSimpleLine size={20} color={foreground} weight="fill" />}>Responder</DropdownItem>
                                                            <DropdownItem key="excluir" className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </div>


                                                <Dropdown className={`text-foreground ${temaSistema}`}>
                                                    <DropdownTrigger>
                                                        <div className="bg-content6 p-2 text-center rounded-b-xl text-xl font-bold text-background2 sm:hidden">
                                                            GERENCIAR
                                                        </div>
                                                    </DropdownTrigger>
                                                    <DropdownMenu className={temaSistema} onAction={(acao) => selecao(acao, { pergunta, id })}>
                                                        <DropdownItem key='responder' startContent={<PencilSimpleLine size={20} color={foreground} weight="fill" />}>Responder</DropdownItem>
                                                        <DropdownItem key="excluir" className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
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
                            {dbPerguntasNovas && dbPerguntasNovas.length == 0 &&
                                <div className=" w-full h-[calc(700px)] flex flex-col md:flex-row gap-10 items-center">
                                    <img src="../../public/olho2.webp" alt="" className="rounded-full" />
                                    <div className="border-l-4 pl-2">
                                        <h3 className="text-2xl sm:text-4xl font-bold bg-content5 p-2">Nenhuma pergunta para responder agora !</h3>
                                        <p className="text-xl mt-3">Volte mais tarde...</p>
                                    </div>
                                </div>
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
                                perguntasAtualizadas.map(({ pergunta, id }) => (
                                    <div className="w-full h-auto bg-content2 bg-opacity-40 backdrop-blur-sm rounded-2xl flex justify-between gap-5 p-3 static break-words hover:translate-y-1 transition-all cursor-pointer" key={id} onClick={() => visualizarPergunta(id)}>

                                        <div className="flex items-center h-auto gap-3 relative">
                                            <div>
                                                <Books size={36} color={foreground} />
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


