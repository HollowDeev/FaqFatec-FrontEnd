import { Accordion, AccordionItem, Button } from "@nextui-org/react"
import { Eye, EyeClosed, GearSix } from "@phosphor-icons/react"
import { perguntas } from "../../data/perguntas"
import PropTypes from 'prop-types'
import Icone from "../Icone/Icone"
import { useContext } from "react"
import temaContexto from "../../context/TemaContexto"

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

export default function CardPergunta({limite, tema, filtro, cor, tipo }) {

    const {tema: temaSistema} = useContext(temaContexto)

    switch(tipo){
        case "visualizacao":
            switch(filtro){
                case "limite":
                
                    return (
                        <Accordion variant="splitted" itemClasses={{title: "text-2xl font-bold", base: "group-[.is-splitted]:bg-content2 group-[.is-splitted]:backdrop-blur-sm group-[.is-splitted]:rounded-2xl group-[.is-splitted]:bg-opacity-60"}} >
                            {
                                perguntas.filter((pergunta, índice) => índice < limite).map((pergunta) => (
                                    <AccordionItem 
                                        key={pergunta.id} 
                                        title={pergunta.title} 
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
                        <Accordion variant="splitted" itemClasses={{title: "text-2xl font-bold", base: "group-[.is-splitted]:bg-content2 group-[.is-splitted]:backdrop-blur-sm group-[.is-splitted]:rounded-2xl group-[.is-splitted]:bg-opacity-60"}}>
                            {
                                perguntas.filter((pergunta) => pergunta.tema == tema).map((pergunta) => (
                                    <AccordionItem 
                                        key={pergunta.id} 
                                        title={pergunta.title} 
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
                        <Accordion variant="splitted" itemClasses={{title: "text-2xl font-bold", base: "group-[.is-splitted]:bg-content2 group-[.is-splitted]:backdrop-blur-sm group-[.is-splitted]:rounded-2xl group-[.is-splitted]:bg-opacity-60"}}>
                            {
                                perguntas.map(({id, title, tema, resposta}) => (
                                    <AccordionItem 
                                        key={id} 
                                        title={title} 
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
            switch(filtro){
                case "nenhum":
                    return (
                    <div className="w-full flex flex-col gap-10">
                    
                    {perguntas.map((pergunta) => (
                        <>
                        <div className="w-full h-auto bg-content2 bg-opacity-60 rounded-2xl flex flex-col justify-between gap-5 p-3 static break-words">

                            <div className="flex items-center h-auto gap-3 relative">
                                <div>
                                    <Icone tema={pergunta.tema} cor={cor} tamanho={50}  />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">{pergunta.title}</h1>
                                    <p className="opacity-50 font-light">{pergunta.tema}</p>
                                </div>
                                <Button isIconOnly color="success" className="hidden sm:flex absolute right-2">
                                    <GearSix size={24} color="#070707" weight="bold"/>
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

                case "tema":
                    return (
                        <div className="w-full flex flex-col gap-10">
                    
                    {perguntas.filter((pergunta) => pergunta.tema == tema).map((pergunta) => (
                        <>
                        <div className="w-full h-auto bg-content2 bg-opacity-60 rounded-2xl flex flex-col justify-between gap-5 p-3 static break-words">

                            <div className="flex items-center h-auto gap-3 relative">
                                <div>
                                    <Icone tema={pergunta.tema} cor={cor} tamanho={50}  />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">{pergunta.title}</h1>
                                    <p className="opacity-50 font-light">{pergunta.tema}</p>
                                </div>
                                <Button isIconOnly color="success" className="hidden sm:flex absolute right-2">
                                    <GearSix size={24} color="#070707" weight="bold"/>
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


