import App from "./App"
import temaContexto from "./context/TemaContexto"
import {useContext} from 'react'

function Main() {

  const {tema} = useContext(temaContexto)

  return (
    <main className={` ${tema} text-foreground bg-background`}>
      <App />
    </main>
  )
}

export default Main
