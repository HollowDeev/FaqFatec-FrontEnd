import { useContext } from "react"
import gerenciadorContexto from "../context/Gerenciador/gerenciadorContexto"

const useGerenciadorContexto = () => {

    const contexto = useContext(gerenciadorContexto)

  return contexto
}

export default useGerenciadorContexto