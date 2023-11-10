import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"

import { GearSix, PencilSimpleLine, Trash, User } from "@phosphor-icons/react"
import { useContext } from "react"
import temaContexto from "../../context/TemaContexto"
import useGerenciadorContexto from "../../hooks/useGerenciadorContexto"
import { useGerenciador } from "../../hooks/useGerenciador"
import { useActionsApi } from "../../hooks/useActionsApi"
import { AuthContext } from "../../context/Auth/AuthProvider"
import { useState } from "react"
import CardColaboradoresSkeleton from "./CardColaboradoresSkeleton"
import dataContexto from "../../context/Data/dataContexto"


const CardColaboradores = () => {

    const {tema: temaSistema} = useContext(temaContexto)

    const actionsApi = useActionsApi()
    const {parametrosRequisicao} = useContext(AuthContext)

    const {dbColaboradores, recarregarDadosColaboradores} = useContext(dataContexto)

    const {gerenciar} = useGerenciadorContexto()
    const gerenciador = useGerenciador()

    const [loading, setLoading] = useState(false)
    

    const removerColaboradores = async(colaborador_id) => {
        await actionsApi.removerColaboradores(colaborador_id, parametrosRequisicao)
        setLoading(false)
        recarregarDadosColaboradores()
    }

    const selecao = (acao, colaborador) => {
        switch(acao){
            case 'mudarSenha':
                gerenciador.mudarSenha(gerenciar, colaborador)
                break

            case 'remover':
                setLoading(true)
                removerColaboradores(colaborador.id)
                break
        }
    }


  return (
    <>
        {dbColaboradores != null && !loading? (
        <div  className="w-full flex flex-col gap-5" key='1'>
            {dbColaboradores.map((colaboradorDados) => (
                <div className="w-full h-auto bg-content2 bg-opacity-60 rounded-2xl flex flex-col justify-between gap-5 p-3 static" key={colaboradorDados.id}>

                    <div className="flex items-center h-auto gap-3 relative">
                        <div>
                            <User size={50} color="#f9f1f1" weight="duotone" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{colaboradorDados.name}</h1>
                        </div>
                        <Dropdown className={`text-foreground ${temaSistema}`}>
                            <DropdownTrigger>
                                <Button isIconOnly color="success" className="hidden sm:flex absolute right-2 z-0" >
                                    <GearSix size={24} color="#070707" weight="bold" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu onAction={(acao) => selecao(acao, colaboradorDados)}>
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
                            <DropdownMenu  onAction={(acao) => selecao(acao, colaboradorDados)}>
                                <DropdownItem key='mudarSenha' startContent={<PencilSimpleLine size={20} color="#f9f1f1" weight="fill" />}>Mudar Senha</DropdownItem>
                                <DropdownItem key="remover"  className="text-danger" startContent={<Trash size={20} color="#C2120D" weight="fill" />}>Remover</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                </div>
            ))}
        </div>
        )
        :
            <CardColaboradoresSkeleton />
        }
    </>
  )
}

export default CardColaboradores
