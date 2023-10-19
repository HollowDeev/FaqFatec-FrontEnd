import { useContext } from "react"
import CardPergunta from "../../components/CardPergunta/CardPergunta"
import { AuthContext } from "../../context/Auth/AuthProvider"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

const Home = () => {

  const {usuario, sair} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleOut = () => {
    sair()
    window.location.reload(false);
  }

  return (
    <div>
        <CardPergunta filtro="limite" limite={5}/>
        {usuario && <Button onPress={handleOut}>Sair</Button>}
        {!usuario && <Button onPress={() => navigate('/login')}>Login</Button>}
        
    </div>
  )
}

export default Home