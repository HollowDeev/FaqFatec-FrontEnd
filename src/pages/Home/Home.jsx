import { useContext, useEffect, useState } from "react"
import CardPergunta from "../../components/CardPergunta/CardPergunta"
import CardTema from "../../components/CardTema/CardTema"
import { ArrowFatLineLeft } from "@phosphor-icons/react"
import paginaHomeContexto from "../../context/PaginaHome/PaginaHomeContexto"
import { AuthContext } from "../../context/Auth/AuthProvider"


const Home = () => {

  const {temaPagina, definirTema} = useContext(paginaHomeContexto)
  const [alunoLogado, definirALunoLogado] = useState(false)

  const {checarAutorizacao} = useContext(AuthContext)

  useEffect(() => {
    const verificar = async () => {
      const userData = await checarAutorizacao()

      if(userData && userData.level == 0){
        definirALunoLogado(true)
        
      }
    }

    verificar()
  }, [])


  return (
    <div className="lg:w-[1000px] xl:w-[1300px] m-auto sm:px-20 flex flex-col ">

    {temaPagina == "inicial" ? 

      <>
        <div className="w-full flex flex-col items-center mb-20">
          <h1 className="text-2xl sm:text-3xl font-bold my-5">
            <span className="text-content5">Últimas </span> 
            Perguntas
          </h1>
          <CardPergunta filtro="limite" limite={5}/> 
        </div>

        <div className="w-full flex flex-col items-center mb-20">
          <h1 className="text-2xl sm:text-3xl font-bold my-5 text-content5">
            Temas
          </h1>
          <CardTema />
        </div>
      </>

      : 

      <>
        <div className="w-full flex flex-col items-center mb-20 gap-5">
          <div className="w-full flex flex-col items-center md:flex-row-reverse md:justify-between">
      
            <div className="hidden md:block w-40"></div>
            <h1 className="text-2xl sm:text-3xl font-bold my-5 text-content5">
              {temaPagina.toUpperCase()}
            </h1>
            <a className="flex items-center gap-2 md:ml-3 cursor-pointer hover:translate-x-[-10px] transition-transform" 
            onClick={() => definirTema('inicial')}>
              <ArrowFatLineLeft size={24} color="#fdfcfc" weight="duotone" />
              <p>Voltar aos temas</p>
            </a>
          </div>
          <CardPergunta filtro="tema" temaParaFiltro={temaPagina}/> 
          {alunoLogado && 
          
          <p>Sugerir pergunta</p>
          
          }
        </div>
      </>
    }

  </div>
  )
}

export default Home