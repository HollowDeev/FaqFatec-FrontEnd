import { useContext } from "react";
import CardPergunta from "./components/CardPergunta/CardPergunta"
// eslint-disable-next-line no-unused-vars
import {Button, ButtonGroup} from "@nextui-org/react";
import temaContexto from "./context/TemaContexto";

function App() {

  // eslint-disable-next-line no-unused-vars
  const {setTema} = useContext(temaContexto)

  return (
    <>
      <CardPergunta filtro='limite' limite={3} />
      <div className="flex flex-wrap justify-around">
        <div className="h-32 w-32 bg-background m-5 rounded-md border-1"></div>
        <div className="h-32 w-32 bg-background2 m-5 rounded-md"></div>
        <div className="h-32 w-32 bg-foreground m-5 rounded-md"></div>
        <div className="h-32 w-32 bg-content1 m-5 rounded-md"></div>
        <div className="h-32 w-32 bg-content2 m-5 rounded-md"></div>
        <div className="h-32 w-32 bg-content3 m-5 rounded-md"></div>
        <div className="h-32 w-32 bg-content5 m-5 rounded-md"></div>
        <div className="h-32 w-32 bg-content6 m-5 rounded-md"></div>
      </div>

      <ButtonGroup className="m-10">
        <Button variant="ghost" onPress={() => setTema("dark")}>
          Dark
        </Button>
        <Button variant="ghost" onPress={() => setTema("light")}>
          Light
      </Button>
      </ButtonGroup>
    </>
  )
}

export default App
