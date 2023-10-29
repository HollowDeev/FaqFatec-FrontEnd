import P from "prop-types"
import gerenciadorContexto from "./gerenciadorContexto"
import { useReducer } from "react"

const valorInicial = [
    {
        editarPergunta: false,
        adicionarPergunta: false,
        idPergunta: null,
        pergunta: '',
        resposta: '',
        tema: ''
    }
]

const reducer = (state, action) => {
    switch(action.type) {
        case 'editarPergunta':
            return [
                {
                    editarPergunta: true,
                    adicionarPergunta: false,
                    idPergunta: action.pergunta.id,
                    pergunta: action.pergunta.titulo,
                    resposta: action.pergunta.resposta,
                    tema: action.pergunta.tema
                }
            ]

        case 'adicionarPergunta':
        return [
            {
                editarPergunta: false,
                adicionarPergunta: true,
                idPergunta: null,
                pergunta: '',
                resposta: '',
                tema: ''
            }
        ]

        case 'fechar':
            return [
                {
                    editarPergunta: false,
                    adicionarPergunta: false,
                    idPergunta: null,
                    pergunta: '',
                    resposta: '',
                    tema: ''
                }
            ]

        default:
            return [ ...state]
    }
}

const GerenciadorProvider = ({children}) => {

    const [gerenciamento, gerenciar] = useReducer(reducer, valorInicial)

    return (
        <gerenciadorContexto.Provider value={{gerenciamento, gerenciar}}>
            {children}
        </gerenciadorContexto.Provider>
    )
}

GerenciadorProvider.propTypes = {
    children : P.node
}

export default GerenciadorProvider