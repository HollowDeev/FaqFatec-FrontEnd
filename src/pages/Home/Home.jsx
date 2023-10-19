import CardPergunta from "../../components/CardPergunta/CardPergunta"

const Home = () => {

  return (
    <div>
      <CardPergunta filtro="limite" limite={5}/>
    </div>
  )
}

export default Home