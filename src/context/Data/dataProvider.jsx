/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState } from 'react'
import dataContexto from './dataContexto'
import P from 'prop-types'
import { useEffect } from 'react'
import { useDataApi } from '../../hooks/useDataApi'
import { AuthContext } from '../Auth/AuthProvider'

const DataProvider = ({children}) => {

    const [dbTemas, definirDbTemas] = useState(null)
    const [dbPerguntas, definirDbPerguntas] = useState(null)
    const [dbIcones, definirDbIcones] = useState(null)
    const [dbColaboradores, definirDbColaboradores] = useState(null)

    const api = useDataApi()
    const {parametrosRequisicao, usuario} = useContext(AuthContext)

    const definirDados = async () => {
        const dados = await api.buscarDados()
        definirDbIcones(dados.icones)
        definirDbPerguntas(dados.perguntas.original)
        
        definirDbTemas(dados.temas.original)
    }

    const definirDadosColaboradores = async() => {
        if(parametrosRequisicao && usuario.level == 2){
            const colaboradores = await api.buscarColaboradores(parametrosRequisicao)
            definirDbColaboradores(colaboradores)
        }
    }

    useEffect(() => {
        definirDadosColaboradores()
    }, [parametrosRequisicao])

    
    useEffect(() => {
        definirDados()
    }, [])

    const recarregarDados = () => {
        definirDbIcones(null)
        definirDbPerguntas(null)
        definirDbTemas(null)
        definirDados()
    }

    const recarregarDadosColaboradores = () => {
        definirDbColaboradores(null)
        definirDadosColaboradores()
    }

  return (
    <dataContexto.Provider value={{dbPerguntas, dbTemas, dbIcones, dbColaboradores, recarregarDados, recarregarDadosColaboradores}}>
        {children}
    </dataContexto.Provider>
  )
}

DataProvider.propTypes = {
    children: P.node
}

export default DataProvider