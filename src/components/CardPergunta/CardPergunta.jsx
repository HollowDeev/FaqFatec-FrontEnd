import { Accordion, AccordionItem, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { Eye, EyeClosed, GearSix, PencilSimpleLine, Trash } from "@phosphor-icons/react"
import { perguntas } from "../../data/perguntas"
import PropTypes from 'prop-types'
import Icone from "../Icone/Icone"
import { useContext } from "react"
import temaContexto from "../../context/TemaContexto"
import { useGerenciador } from "../../hooks/useGerenciador"
import useGerenciadorContexto from "../../hooks/useGerenciadorContexto"

CardPergunta.defaultProps = {
    limite: 0,
    filtro: 'nenhum',
    cor: '#771212',
    tipo: "visualizacao"
}

CardPergunta.propTypes = {
    limite: PropTypes.number,
    filtro: PropTypes.string,
    tema: PropTypes.string,
    cor: PropTypes.string,
    tipo: PropTypes.string
}

export default function CardPergunta({ limite, tema, filtro, cor, tipo }) {

    const { tema: temaSistema } = useContext(temaContexto)

    const { gerenciar } = useGerenciadorContexto()
    const gerenciador = useGerenciador()

    const selecao = (acao, pergunta) => {
        if(acao == "editar"){
            gerenciador.editarPerguntas(gerenciar, pergunta)
        }
    }

    switch (tipo) {
        case "visualizacao":
            switch (filtro) {
                case "limite":

                    return (
                        <Accordion variant="splitted" itemClasses={{ title: "text-2xl font-bold", base: "group-[.is-splitted]:bg-content2 group-[.is-splitted]:backdrop-blur-sm group-[.is-splitted]:rounded-2xl group-[.is-splitted]:bg-opacity-60" }} >
                            {
                                perguntas.filter((pergunta, índice) => índice < limite).map((pergunta) => (
                                    <AccordionItem
                                        key={pergunta.id}
                                        title={pergunta.titulo}
                                        subtitle={pergunta.tema.toUpperCase()}
                                        startContent={
                                            <Icone tema={pergunta.tema} cor={cor} tamanho={50} />
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
                                        <p>{pergunta.resposta}</p>
                                    </AccordionItem>
                                ))
                            }
                        </Accordion>
                    )

                case 'tema':
                    return (
                        <Accordion variant="splitted" itemClasses={{ title: "text-2xl font-bold", base: "group-[.is-splitted]:bg-content2 group-[.is-splitted]:backdrop-blur-sm group-[.is-splitted]:rounded-2xl group-[.is-splitted]:bg-opacity-60" }}>
                            {
                                perguntas.filter((pergunta) => pergunta.tema == tema).map((pergunta) => (
                                    <AccordionItem
                                        key={pergunta.id}
                                        title={pergunta.titulo}
                                        subtitle={pergunta.tema.toUpperCase()}
                                        startContent={
                                            <Icone tema={pergunta.tema} cor={cor} tamanho={50} />
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
                                        <p>{pergunta.resposta}</p>
                                    </AccordionItem>
                                ))
                            }
                        </Accordion>
                    )


                case 'nenhum':
                    return (
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
                                        <p>{resposta}</p>
                                    </AccordionItem>
                                ))
                            }
                        </Accordion>
                    )


            }
            break


        case "gerenciamento":
            switch (filtro) {
                case "nenhum":
                    return (
                        <div className="w-full flex flex-col gap-10">

                            {perguntas.map((pergunta) => (
                                <>
                                    <div className="w-full h-auto bg-content2 bg-opacity-60 rounded-2xl flex flex-col justify-between gap-5 p-3 static break-words" key={pergunta.id}>

                                        <div className="flex items-center h-auto gap-3 relative">
                                            <div>
                                                <Icone tema={pergunta.tema} cor={cor} tamanho={50} />
                                            </div>
                                            <div>
                                                <h1 className="text-2xl font-bold">{pergunta.titulo}</h1>
                                                <p className="opacity-50 font-light">{pergunta.tema}</p>
                                            </div>
                                            <Dropdown className={`text-foreground ${temaSistema}`}>
                                                <DropdownTrigger>
                                                    <Button isIconOnly color="success" className="hidden sm:flex absolute right-2 z-0" >
                                                        <GearSix size={24} color="#070707" weight="bold" />
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu className={tema} onAction={(acao) => selecao(acao, pergunta)}>
                                                    <DropdownItem key='editar' startContent={<PencilSimpleLine size={20} color="#f9f1f1" weight="fill" />}>Editar</DropdownItem>
                                                    <DropdownItem key="excluir"  className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>

                                        <p>{pergunta.resposta}</p>

                                        
                                        <Dropdown className={`text-foreground ${temaSistema}`}>
                                                <DropdownTrigger>
                                                    <div className="bg-content6 p-2 text-center rounded-b-xl text-xl font-bold text-background2 sm:hidden">
                                                        GERENCIAR
                                                    </div>
                                                </DropdownTrigger>
                                                <DropdownMenu className={tema} onAction={(acao) => selecao(acao, pergunta)}>
                                                    <DropdownItem key='editar' startContent={<PencilSimpleLine size={20} color="#f9f1f1" weight="fill" />}>Editar</DropdownItem>
                                                    <DropdownItem key="excluir"  className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Excluir</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                    </div>
                                </>
                            ))
                            }

                        </div>
                    )

                case "tema":
                    return (
                        <div className="w-full flex flex-col gap-10">

                            {perguntas.filter((pergunta) => pergunta.tema == tema).map((pergunta) => (
                                <>
                                    <div className="w-full h-auto bg-content2 bg-opacity-60 rounded-2xl flex flex-col justify-between gap-5 p-3 static break-words">

                                        <div className="flex items-center h-auto gap-3 relative">
                                            <div>
                                                <Icone tema={pergunta.tema} cor={cor} tamanho={50} />
                                            </div>
                                            <div>
                                                <h1 className="text-2xl font-bold">{pergunta.titulo}</h1>
                                                <p className="opacity-50 font-light">{pergunta.tema}</p>
                                            </div>
                                            <Button isIconOnly color="success" className="hidden sm:flex absolute right-2">
                                                <GearSix size={24} color="#070707" weight="bold" />
                                            </Button>
                                        </div>

                                        <p>{pergunta.resposta}</p>

                                        <div className="bg-content6 p-2 text-center rounded-b-xl text-xl font-bold text-background2 sm:hidden">
                                            EDITAR
                                        </div>
                                    </div>
                                </>
                            ))
                            }

                        </div>
                    )
            }

    }

}


