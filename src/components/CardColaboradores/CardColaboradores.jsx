import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { usuarios } from "../../data/usuarios"

import { GearSix, PencilSimpleLine, Trash, User } from "@phosphor-icons/react"
import { useContext } from "react"
import temaContexto from "../../context/TemaContexto"
import useGerenciadorContexto from "../../hooks/useGerenciadorContexto"
import { useGerenciador } from "../../hooks/useGerenciador"


const CardColaboradores = () => {

    const colaboradores = usuarios.filter((usuario) => usuario.level == 1)
    const {tema: temaSistema} = useContext(temaContexto)

    const {gerenciar} = useGerenciadorContexto()
    const gerenciador = useGerenciador()

    const selecao = (acao, colaborador) => {
        switch(acao){
            case 'mudarSenha':
                gerenciador.mudarSenha(gerenciar, colaborador)
        }
    }

  return (
    <div  className="w-full flex flex-col gap-5" key='1'>
        {colaboradores.map((colaborador) => 
        
            <div className="w-full h-auto bg-content2 bg-opacity-60 rounded-2xl flex flex-col justify-between gap-5 p-3 static" key={colaborador.id}>

                <div className="flex items-center h-auto gap-3 relative">
                    <div>
                        <User size={50} color="#f9f1f1" weight="duotone" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{colaborador.nome}</h1>
                    </div>
                    <Dropdown className={`text-foreground ${temaSistema}`}>
                        <DropdownTrigger>
                            <Button isIconOnly color="success" className="hidden sm:flex absolute right-2 z-0" >
                                <GearSix size={24} color="#070707" weight="bold" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu onAction={(acao) => selecao(acao, colaborador)}>
                            <DropdownItem key='mudarSenha' startContent={<PencilSimpleLine size={20} color="#f9f1f1" weight="fill" />}>Mudar Senha</DropdownItem>
                            <DropdownItem key="remover"  className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Remover</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>


                
                <Dropdown className={`text-foreground ${temaSistema}`}>
                        <DropdownTrigger>
                            <div className="bg-content6 p-2 text-center rounded-b-xl text-xl font-bold text-background2 sm:hidden">
                                GERENCIAR
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu  onAction={(acao) => selecao(acao, colaborador)}>
                            <DropdownItem key='mudarSenha' startContent={<PencilSimpleLine size={20} color="#f9f1f1" weight="fill" />}>Mudar Senha</DropdownItem>
                            <DropdownItem key="remover"  className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Remover</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
            </div>

        )}
    </div>
  )
}

export default CardColaboradores