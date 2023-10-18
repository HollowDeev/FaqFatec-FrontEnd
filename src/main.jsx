
import temaContexto from "./context/TemaContexto"
import {useContext} from 'react'
import Home from "./pages/Home/Home"

function Main() {

  const {tema} = useContext(temaContexto)

  return (
    <main className={` ${tema} text-foreground bg-background`}>
      <Home />
    </main>
  )
}

export default Main
