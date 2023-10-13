import {  useState } from "react"

import temaContexto from "./TemaContexto"

// eslint-disable-next-line react/prop-types
function TemaProvider({children}) {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [tema, setTema] = useState('dark')

  return (
    <temaContexto.Provider value={{tema, setTema}}>
      {children}
    </temaContexto.Provider>
  )
}


export default TemaProvider