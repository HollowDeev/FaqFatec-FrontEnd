import {  useState } from "react"

import temaContexto from "./TemaContexto"
import { useEffect } from "react"

// eslint-disable-next-line react/prop-types
function TemaProvider({children}) {


  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [tema, setTema] = useState("light")
  const [foreground, setForeground] = useState('#ECEDEE')
  
  useEffect(() => {
    if(tema == 'light'){
      setForeground('#252A2D')
    }else {
      setForeground("#ECEDEE")
    }
  }, [tema])


  return (
    <temaContexto.Provider value={{tema, foreground, setTema}}>
      {children}
    </temaContexto.Provider>
  )
}


export default TemaProvider