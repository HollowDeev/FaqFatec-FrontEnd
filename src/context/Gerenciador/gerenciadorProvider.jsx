import P from "prop-types"
import gerenciadorContexto from "./gerenciadorContexto"
import { useReducer } from "react"
import { useState } from "react"
import { useGerenciadorReducer } from "../../hooks/reducers/useGerenciadorReducer"


const GerenciadorProvider = ({children}) => {

    const {funcaoReducerGerenciamento, valorInicialGerenciamento} = useGerenciadorReducer()

    const [gerenciamento, gerenciar] = useReducer(funcaoReducerGerenciamento, valorInicialGerenciamento)

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