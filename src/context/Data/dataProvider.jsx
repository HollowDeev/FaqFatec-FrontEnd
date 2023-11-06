/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'
import dataContexto from './dataContexto'
import P from 'prop-types'
import { useEffect } from 'react'
import { useDataApi } from '../../hooks/useDataApi'

const DataProvider = ({children}) => {

    const [dbTemas, definirDbTemas] = useState(null)
    const [dbPerguntas, definirDbPerguntas] = useState(null)
    const [dbIcones, definirDbIcones] = useState(null)

    const api = useDataApi()

    const definirDados = async () => {
        let dados = await api.buscarDados()
        definirDbIcones(dados.icones)
        definirDbPerguntas(dados.perguntas.original)
        definirDbTemas(dados.temas)
    }

    useEffect(() => {
        definirDados()
    }, [])


  return (
    <dataContexto.Provider value={{dbPerguntas, dbTemas, dbIcones}}>
        {children}
    </dataContexto.Provider>
  )
}

DataProvider.propTypes = {
    children: P.node
}

export default DataProvider