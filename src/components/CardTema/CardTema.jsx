import MediaQuery from "react-responsive"
import { temas } from "../../data/temas"
import Icone from "../Icone/Icone"

const CardTema = () => {

  return (
    <div className="flex gap-5 flex-wrap justify-center px-1">
        {temas.map((tema) => 
        
            <div className="w-36 h-36 sm:w-52 sm:h-52 bg-content2 rounded-2xl bg-opacity-60 p-5 text-center flex flex-col justify-between items-center" key={tema.nome}>
                <MediaQuery maxWidth={640}>
                    <Icone tema={tema.nome} tamanho={70}/>
                </MediaQuery>

                <MediaQuery minWidth={640}>
                    <Icone tema={tema.nome} tamanho={100}/>
                </MediaQuery>

                <h1 className="text-2xl font-extrabold">{tema.nome.toUpperCase()}</h1>
            </div>
        )}
        
    </div>
  )
}

export default CardTema