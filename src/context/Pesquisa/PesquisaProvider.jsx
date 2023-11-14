import { useState } from 'react'
import PesquisaContexto from './PesquisaContexto'

// eslint-disable-next-line react/prop-types
const PesquisaProvider = ({children}) => {

    const [idPesquisa, definirIdParaPesquisa] = useState(null)

  return (
    <PesquisaContexto.Provider value={{idPesquisa, definirIdParaPesquisa}}>
        {children}
    </PesquisaContexto.Provider>
  )
}

export default PesquisaProvider