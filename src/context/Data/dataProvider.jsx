/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState } from 'react'
import dataContexto from './dataContexto'
import P from 'prop-types'
import { useEffect } from 'react'
import { useDataApi } from '../../hooks/useDataApi'
import { AuthContext } from '../Auth/AuthProvider'

const DataProvider = ({children}) => {

    const [dbTemas, definirDbTemas] = useState(null)
    const [dbIcones, definirDbIcones] = useState(null)
    const [dbColaboradores, definirDbColaboradores] = useState(null)

    const [dbPerguntasOnline, definirDbPerguntasOnline] = useState(null)
    const [dbPerguntasOffline, definirDbPerguntasOffline] = useState(null)
    const [dbPerguntasNovas, definirDbPerguntasNovas] = useState([])

    const [temPerguntasNovas, definirEstadoPerguntasNovas] = useState(false)
    const [quantasPerguntasNovas, definirQuantidadePerguntasNovas] = useState(0)

    const api = useDataApi()
    const {parametrosRequisicao, usuario} = useContext(AuthContext)

    const definirDados = async () => {
        const dados = await api.buscarDados()

        definirDbIcones(dados.icones)
        definirDbPerguntasOnline(dados.perguntasOnline.original)
        definirDbPerguntasOffline(dados.perguntasOffline.original)
        definirDbPerguntasNovas(dados.perguntasAluno.original)
        definirDbTemas(dados.temas.original)
    }


    useEffect(()=> {
        if(dbPerguntasNovas.length != 0){
            definirEstadoPerguntasNovas(true)
            definirQuantidadePerguntasNovas(dbPerguntasNovas.length)

        }else {
            definirEstadoPerguntasNovas(false)
        }
    }, [dbPerguntasNovas])

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
        definirDbPerguntasOnline(null)
        definirDbPerguntasOffline(null)
        definirDbPerguntasNovas([])
        definirDbTemas(null)
        definirDados()
        console.log('teste')
    }

    const recarregarDadosColaboradores = () => {
        definirDbColaboradores(null)
        definirDadosColaboradores()
    }

  return (
    <dataContexto.Provider value={{dbPerguntasOnline, dbPerguntasNovas, dbPerguntasOffline, dbTemas, dbIcones, dbColaboradores, recarregarDados, recarregarDadosColaboradores, temPerguntasNovas, quantasPerguntasNovas}}>
        {children}
    </dataContexto.Provider>
  )
}

DataProvider.propTypes = {
    children: P.node
}

export default DataProvider