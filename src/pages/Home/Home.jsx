import CardPergunta from "../../components/CardPergunta/CardPergunta"
import CardTema from "../../components/CardTema/CardTema"

const Home = () => {

  return (
    <div className="lg:w-[1000px] xl:w-[1300px] m-auto sm:px-20 flex flex-col ">

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

    </div>
  )
}

export default Home