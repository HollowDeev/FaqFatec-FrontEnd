import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from '@nextui-org/react';
import P from 'prop-types'
import useGerenciadorContexto from '../../hooks/useGerenciadorContexto';
import { useContext, useEffect, useState } from 'react';
import { useGerenciador } from '../../hooks/useGerenciador';
import temaContexto from '../../context/TemaContexto';
import { SealCheck, Warning } from '@phosphor-icons/react';
import { useActionsApi } from '../../hooks/useActionsApi';
import { AuthContext } from '../../context/Auth/AuthProvider';
import dataContexto from '../../context/Data/dataContexto';

const Alerta = () => {

    const {tema} = useContext(temaContexto)

    const {parametrosRequisicao} = useContext(AuthContext)
    const {recarregarDados} = useContext(dataContexto)

    const {gerenciamento, gerenciar} = useGerenciadorContexto()
    const gerenciador= useGerenciador()
    
    const actionsApi = useActionsApi()

    const [dados, definirDados] = useState(null)
    const [loading, definirLoading] = useState(false)

    const [alertaNotificacao, definirAlertaNotificacao] = useState()

    useEffect(()=> {
        definirDados(gerenciamento[3])
    }, [gerenciamento])


    useEffect(() => {
        dados && dados.tipo == 'notificacao' ? definirAlertaNotificacao(true) : definirAlertaNotificacao(false)
        
    }, [dados])

    const fechar = () => {
        gerenciador.fechar(gerenciar)
    }

    const continuar = async () => {
        switch(dados.funcao){
            case 'excluirPergunta':
                definirLoading(true)
                await actionsApi.deletarPergunta(dados.dadosFuncao, parametrosRequisicao)
                recarregarDados()
                definirLoading(false)
                gerenciador.fechar(gerenciar)
                break

            case 'mudarEstadoPergunta':{
                definirLoading(true)
                const {
                    pergunta,
                    resposta,
                    estado,
                    tema_id,
                    id
                } = dados.dadosFuncao

                await actionsApi.salvarEdicaoPergunta(pergunta, resposta, estado, tema_id, id, parametrosRequisicao)
                definirLoading(false)
                gerenciador.fechar(gerenciar)
                recarregarDados()
            }
               
        }
    }

  return (
    <>
    {dados &&
        <Modal isOpen={dados.exibir} className={`${tema} text-foreground`} backdrop={alertaNotificacao ? 'opaque' : 'blur'} hideCloseButton='true' placement={alertaNotificacao ? "top" : "bottom-center"}>
            <ModalContent>
                <ModalHeader className='flex items-center gap-3'>
                    {!alertaNotificacao ?
                        <Warning size={30} color="#771212" weight="duotone" />
                    :
                        <SealCheck size={30} color="#17c964" weight="duotone" />
                    }
                    <h1 className={`${!alertaNotificacao ? "bg-content5 text-white" : "bg-content6 text-black"} px-2 border-l-2 border-foreground`}>{dados.titulo}</h1>
                </ModalHeader>
                <ModalBody>
                    {dados.mensagem}
                </ModalBody>
                <ModalFooter>
                    {dados.tipo == 'notificacao' ? 
                        <Button onClick={() => fechar()} variant='light' color='success'>Ok</Button>
                    :
                        <div className='flex items-center gap-2'>
                            <Button onClick={() => fechar()} variant='light' >Cancelar</Button>
                            <Button onClick={() => continuar()} variant='bordered' color='danger'>
                                {!loading ? 'Continuar' : <Spinner color='danger' size='sm'/> }
                            </Button>
                        </div>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    }
    </>
  )
}

Alerta.propTypes = {
    titulo: P.string,
    mensagem: P.string,
    funcao: P.func,
    isOpen: P.bool
}

export default Alerta