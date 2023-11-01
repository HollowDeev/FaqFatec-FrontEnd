
import { useState } from "react"
import paginaHomeContexto from "./PaginaHomeContexto"

const PaginaHomeProvider = ({children}) => {

  const [temaPagina, definirTema]= useState('inicial')
    
  return (
    <paginaHomeContexto.Provider value={{temaPagina, definirTema}}>
      {children}
    </paginaHomeContexto.Provider>
  )
}

export default PaginaHomeProvider