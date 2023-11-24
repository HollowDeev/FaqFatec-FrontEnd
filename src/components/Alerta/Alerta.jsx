import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from '@nextui-org/react';
import P from 'prop-types'
import useGerenciadorContexto from '../../hooks/useGerenciadorContexto';
import { useContext, useEffect, useState } from 'react';
import { useGerenciador } from '../../hooks/useGerenciador';
import temaContexto from '../../context/TemaContexto';
import { Warning } from '@phosphor-icons/react';
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

    useEffect(()=> {
        definirDados(gerenciamento[3])
    }, [gerenciamento])

    // useEffect(() => {
    //     console.log(dados)
    // }, [dados])

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
        <Modal isOpen={dados.exibir} className={`${tema} text-foreground`} backdrop='blur' hideCloseButton='true'>
            <ModalContent>
                <ModalHeader className='flex items-center gap-3'>
                    {dados.tipo == 'alerta' &&
                        <Warning size={30} color="#771212" weight="duotone" />
                    }
                    <h1 className='bg-content5 text-foreground px-2 border-l-2'>{dados.titulo}</h1>
                </ModalHeader>
                <ModalBody>
                    {dados.mensagem}
                </ModalBody>
                <ModalFooter>
                    {dados.tipo == 'notificacao' ? 
                        <Button onClick={() => fechar()} variant='light'>Ok</Button>
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