import { Accordion, AccordionItem } from "@nextui-org/react"
import { Eye, EyeClosed } from "@phosphor-icons/react"
import { perguntas } from "../../data/perguntas"
import PropTypes from 'prop-types'
import Icone from "../Icone/Icone"

CardPergunta.defaultProps = {
    limite: 0,
    filtro: 'nenhum'
}

CardPergunta.propTypes = {
    limite: PropTypes.number,
    filtro: PropTypes.string,
    tema: PropTypes.string
}

export default function CardPergunta({limite, tema, filtro}) {

    switch(filtro){
        case "limite":
            {console.log(perguntas.filter((pergunta, índice) => índice < 1))}
            return (
                <Accordion variant="splitted" itemClasses={{title: "text-2xl font-bold"}}>
                    {
                        perguntas.filter((pergunta, índice) => índice < limite).map((pergunta) => (
                            <AccordionItem 
                                key={pergunta.id} 
                                title={pergunta.title} 
                                subtitle={pergunta.tema.toUpperCase()} 
                                startContent={
                                    <Icone tema={pergunta.tema} cor={'#771212'} tamanho={50} />
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
                                <p>{pergunta.resposta}</p>
                            </AccordionItem>
                        ))
                    }
                 </Accordion>
            )

        case 'tema':
            return (
                <Accordion variant="splitted" itemClasses={{title: "text-2xl font-bold"}}>
                    {
                        perguntas.filter((pergunta) => pergunta.tema == tema).map((pergunta) => (
                            <AccordionItem 
                                key={pergunta.id} 
                                title={pergunta.title} 
                                subtitle={pergunta.tema.toUpperCase()} 
                                startContent={
                                    <Icone tema={pergunta.tema} cor={'#771212'} tamanho={50} />
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
                                <p>{pergunta.resposta}</p>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            )
            

        case 'nenhum':
            return (
                <Accordion variant="splitted" itemClasses={{title: "text-2xl font-bold"}}>
                    {
                        perguntas.map(({id, title, tema, resposta}) => (
                            <AccordionItem 
                                key={id} 
                                title={title} 
                                subtitle={tema.toUpperCase()}  
                                startContent={
                                    <Icone tema={tema} cor={'#771212'} tamanho={50} />
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
}


