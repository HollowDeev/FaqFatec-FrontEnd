import P from "prop-types"
import gerenciadorContexto from "./gerenciadorContexto"
import { useReducer } from "react"
import { useState } from "react"

const valorInicial = [
    {
        editarPergunta: false,
        adicionarPergunta: false,
        idPergunta: null,
        pergunta: '',
        resposta: '',
        tema: ''
    },
    {
        editarTema: false,
        adicionarTema: false,
        idTema: null,
        nome: '',
        icone: ''
    },
    {
        mudarSenha: false,
        adicionarColaborador: false,
        nome: '',
        idColaborador: '',
        email: '',
        senha: '',
        nivel: 1
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
                    pergunta: action.pergunta.pergunta,
                    resposta: action.pergunta.resposta,
                    tema: action.pergunta.tema
                },
                state[1],
                state[2]   
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
            },
            state[1],
            state[2]   
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
                },
                {
                    editarTema: false,
                    adicionarTema: false,
                    idTema: null,
                    nome: '',
                    icone: ''
                },
                {
                    mudarSenha: false,
                    adicionarColaborador: false,
                    nome: '',
                    idColaborador: '',
                    email: '',
                    senha: '',
                    nivel: 1
                }
            ]

        case 'editarTema':
            return [
                state[0],
                {
                    editarTema: true,
                    adicionarTema: false,
                    idTema: action.tema.id,
                    nome: action.tema.tema,
                    icone: action.tema.icone
                },
                state[2]
            ]

        case 'adicionarTema':
            return [
                state[0],
                {
                    editarTema: false,
                    adicionarTema: true,
                    idTema: null,
                    nome: '',
                    icone: ''
                },
                state[2]
            ]

        case 'mudarSenha':
            return [
                state[0],
                state[1],
                {
                    mudarSenha: true,
                    adicionarColaborador: false,
                    nome: action.colaborador.name,
                    idColaborador: action.colaborador.id,
                    email: '',
                    senha: '',
                    nivel: 1
                }
            ]

        case 'adicionarColaborador':
            return [
                state[0],
                state[1],
                {
                    mudarSenha: false,
                    adicionarColaborador: true,
                    nome: '',
                    idColaborador: '',
                    email: '',
                    senha: '',
                    nivel: 1
                }
            ]

        default:
            return [ ...state]
    }
}

const GerenciadorProvider = ({children}) => {

    const [gerenciamento, gerenciar] = useReducer(reducer, valorInicial)

    const [buscarColaboradores, definirBuscaColaboradores] = useState(true)

    return (
        <gerenciadorContexto.Provider value={{gerenciamento, gerenciar, buscarColaboradores, definirBuscaColaboradores}}>
            {children}
        </gerenciadorContexto.Provider>
    )
}

GerenciadorProvider.propTypes = {
    children : P.node
}

export default GerenciadorProvider