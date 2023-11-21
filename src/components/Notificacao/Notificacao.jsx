import { Badge } from "@nextui-org/react"
import { BellRinging } from "@phosphor-icons/react"
import { useContext } from "react"
import temaContexto from "../../context/TemaContexto"
import { AuthContext } from "../../context/Auth/AuthProvider"
import { useState } from "react"
import CardPergunta from "../CardPergunta/CardPergunta"

const Notificacao = () => {
    
    const [notificacaoAberta, definirEstadoNotificacao] = useState(false)

  const {tema} = useContext(temaContexto)
  const content1 = tema == "dark" ? "#18181B" : "#fff"

  const {perguntasAtualizadas} = useContext(AuthContext)

  return (
    <>
        <Badge content={perguntasAtualizadas.length} color='success' showOutline={false} variant="shadow" placement="top-left" className="font-bold">
            <div className="rounded-full bg-foreground p-2 cursor-pointer" onClick={() => definirEstadoNotificacao((prev) => !prev)}>
                <BellRinging size={24} color={content1} weight="fill" />
            </div>
        </Badge>
        {notificacaoAberta &&
            <div className="absolute top-20 right-5 z-40 rounded-3xl bg-background p-2 py-3 bg-opacity-75 text-center">
               <h1 className="text-xl font-bold mb-3">
                Perguntas 
                <span className="text-content6"> Atualizadas</span>
               </h1>
                <CardPergunta tipo='notificacao'/>
            </div>
        }
    </>
  )
}

export default Notificacao