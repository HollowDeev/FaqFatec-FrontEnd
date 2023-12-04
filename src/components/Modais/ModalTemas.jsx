import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, useDisclosure } from '@nextui-org/react'
import P from 'prop-types'
import { useContext } from 'react'
import temaContexto from '../../context/TemaContexto'
import useGerenciadorContexto from '../../hooks/useGerenciadorContexto'
import { useGerenciador } from '../../hooks/useGerenciador'
import { useState } from 'react'
import { useEffect } from 'react'
import { StackSimple, Textbox, Upload, XCircle } from '@phosphor-icons/react'
import Icone from '../Icone/Icone'
import dataContexto from '../../context/Data/dataContexto'
import { useActionsApi } from '../../hooks/useActionsApi'
import { AuthContext } from '../../context/Auth/AuthProvider'



// eslint-disable-next-line react/prop-types
const ModalTemas = ({isOpen, acao}) => {
  
  const { tema: temaSistema, foreground } = useContext(temaContexto)

  const {parametrosRequisicao} = useContext(AuthContext)

  const [loading, setLoading] = useState(false)

  const {dbIcones, recarregarDados} = useContext(dataContexto)
  const actionsApi = useActionsApi()

  const { onOpenChange } = useDisclosure()

  const {gerenciamento, gerenciar} = useGerenciadorContexto()
  const gerenciador = useGerenciador()

  const [nome, definirNome] = useState('')
  const [icone, definirIcone] = useState(new Set([]))

  useEffect(() => {
    definirNome(gerenciamento[1].nome)
    definirIcone(new Set([gerenciamento[1].icone]))
  }, [gerenciamento])

  const btnCancelar = () => {
    gerenciador.fechar(gerenciar)
  }

  const btnFinalizar = async () => {
    if(!loading){
      setLoading(true)
      if(gerenciamento[1].editarTema){
        if(parametrosRequisicao){
          const idTema = gerenciamento[1].idTema
          await actionsApi.salvarEdicaoTema(idTema, nome, icone.currentKey, parametrosRequisicao)
        }
      }else {
        await actionsApi.adicionarTema(nome.toUpperCase(), icone.currentKey, parametrosRequisicao)
      }
      recarregarDados()
      gerenciador.fechar(gerenciar)
      setLoading(false)
    }
  }

  return (
    <Modal className={temaSistema} isOpen={isOpen} onOpenChange={onOpenChange} size='5xl' scrollBehavior='inside' >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className='flex justify-center'>
            {acao == "edicao" ? 
              <h1 className="text-2xl sm:text-3xl font-bold my-5 text-foreground">
                <span className="text-content6">Editar </span>
                Tema
              </h1>
              :
              <h1 className="text-2xl sm:text-3xl font-bold my-5 text-foreground">
                <span className="text-content6">Adicionar </span>
                Tema
              </h1>
            }
          </ModalHeader>
          <ModalBody>
            <div>
              <Input size={'lg'} className='text-foreground' label="Nome:" description="Digite o nome" isRequired value={nome.toUpperCase()} 
              onChange={(e) => definirNome(e.target.value)} startContent={<Textbox size={25} color={foreground} weight="fill" />}
              />
            </div>
            <div className='mt-8'>
              {dbIcones && (
                <Select
                labelPlacement='outside'
                label="Icone:"
                items={dbIcones}
                className="text-foreground"
                selectedKeys={icone}
                onSelectionChange={definirIcone}
                startContent={<StackSimple size={25} color={foreground} weight="fill" />}
                description="Selecione o tema dessa pergunta"
                isRequired
              >
                {
                  ({icone}) => <SelectItem key={icone} startContent={<Icone icone={icone} tamanho={25}/>}>{icone}</SelectItem>
                }
              </Select>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose} onClick={btnCancelar}
              variant='light' color='danger' className='text-xl p-6'
              endContent={
                <XCircle size={25} color="#FF000F" weight="fill" />
              }
            >
              Cancelar
            </Button>

            <Button onPress={onClose} onClick={btnFinalizar}
              variant={temaSistema == 'dark' ? 'flat' : 'bordered'} color='success' className='text-xl p-6'
              endContent={ loading ? 
                <Spinner color='success' />
              : 
                <Upload size={48} color="#17C964" weight="fill" /> 
              }
            >
              {acao == 'edicao' ? 'Salvar' : "Adicionar"}
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
    </Modal>
  )
  }

  ModalTemas.propTypes = {
  isOpen: P.bool,
  acao: P.string
}

export default ModalTemas