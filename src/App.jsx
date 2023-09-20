
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import CardPergunta from "./components/areaAluno/CardPergunta/CardPergunta"
import { useState } from "react"
import { Code, FolderOpen, Trash } from "@phosphor-icons/react"


function App() {

  const [tema, setTema] = useState('')

  return (
    <>
      <CardPergunta filtro='tema' tema={tema} />

      <Dropdown placement='right' backdrop="blur">
        <DropdownTrigger>
          <Button variant="flat" className="mt-5 w-13 ml-2">
            <FolderOpen size={32} color="#ffffff" weight="fill" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu onAction={(key) => setTema(key)} >
          <DropdownItem 
            key='dsm'
            startContent={
              <Code size={16} color="#000000" weight="bold" />
            }
            description='Ver perguntas sobre DSM'
            > Ver DSM </DropdownItem>
          <DropdownItem key='geral' description='Ver perguntas sobre geral'> Ver Geral </DropdownItem>
          <DropdownItem 
            key='ano-letivo'
            description='Ver perguntas sobre Ano Letivo'
          > Ver Ano Letivo 
          </DropdownItem>
          <DropdownItem 
            key='' 
            className="text-danger" 
            color="danger" 
            startContent={
              <Trash size={16} weight="bold" />
            }
            description='Limpar'
            > Limpa 
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export default App
