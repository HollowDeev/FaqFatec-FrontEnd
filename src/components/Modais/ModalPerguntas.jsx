import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, useDisclosure } from '@nextui-org/react'
import P from 'prop-types'
import { useContext } from 'react'
import temaContexto from '../../context/TemaContexto'
import useGerenciadorContexto from '../../hooks/useGerenciadorContexto'
import { useGerenciador } from '../../hooks/useGerenciador'
import EditorTexto from '../EditorTexto/EditorTexto'
import { useState } from 'react'
import { useEffect } from 'react'
import { Folders, Upload, XCircle } from '@phosphor-icons/react'
import Icone from '../Icone/Icone'
import { useActionsApi } from '../../hooks/useActionsApi'
import { AuthContext } from '../../context/Auth/AuthProvider'
import dataContexto from '../../context/Data/dataContexto'


// eslint-disable-next-line react/prop-types
const ModalPerguntas = ({isOpen, acao}) => {
  
  const {tema: temaSistema} = useContext(temaContexto)

  const {dbTemas, recarregarDados} = useContext(dataContexto)

  const { onOpenChange } = useDisclosure()
  const {gerenciamento, gerenciar} = useGerenciadorContexto()
  const gerenciador = useGerenciador()

  // Parametros de URL e Token para as funcoes de servico
  const {parametrosRequisicao} = useContext(AuthContext)

  // Funcoes de servico
  const actionsApi = useActionsApi()

  const [loading, definirLoading] = useState(false)

  const [pergunta, definirPergunta] = useState('')
  const [resposta, definirResposta] = useState('')
  const [tema, definirTema] = useState('')

  useEffect(() => {
    definirPergunta(gerenciamento[0].pergunta)
    definirResposta(gerenciamento[0].resposta)
    let tema
    if(gerenciamento[0].tema != ''){
      tema = dbTemas.filter((tema) => tema.tema == gerenciamento[0].tema).map((tema) => tema.id.toString())
      definirTema(tema[0])
    } 
  }, [gerenciamento])

  const btnCancelar = () => {
    gerenciador.fechar(gerenciar)
  }

  const btnFinalizar = async () => {
    if(!loading){
      definirLoading(true)

      if(gerenciamento[0].editarPergunta || gerenciamento[0].responderPergunta){
        if(parametrosRequisicao && tema != '' && pergunta != '' && resposta != ''){
          const idPergunta = gerenciamento[0].idPergunta
          await actionsApi.salvarEdicaoPergunta(pergunta, resposta, Number(tema), idPergunta, parametrosRequisicao)
        }
      }else {
        await actionsApi.adicionarPergunta(pergunta, resposta, Number(tema), parametrosRequisicao)
      }
      
      recarregarDados() 

      definirLoading(false)
      gerenciador.fechar(gerenciar)
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
                Pergunta
              </h1>
              : acao == 'adicao' ?
              <h1 className="text-2xl sm:text-3xl font-bold my-5 text-foreground">
                <span className="text-content6">Adicionar </span>
                Pergunta
              </h1>
              :
              <h1 className="text-2xl sm:text-3xl font-bold my-5 text-foreground">
                <span className="text-content6">Responde </span>
                Pergunta
              </h1>
            }
          </ModalHeader>
          <ModalBody>
            <div>
              <Input size={'lg'} className='text-foreground' label="Pergunta:" description="Digite a pergunta" isRequired value={pergunta} 
              onChange={(e) => definirPergunta(e.target.value)}
              />
            </div>
            <div>
              <p className='text-foreground mb-2'>Resposta: *</p>
              <EditorTexto 
                textoInicial={resposta}
                onChange={definirResposta}
              />
            </div>
            <div className='mt-8'>
              {dbTemas != null && (
                <Select
                labelPlacement='outside'
                label="Tema:"
                items={dbTemas}
                className="text-foreground"
                selectedKeys={[tema]}
                onChange={(e) => definirTema(e.target.value)}
                startContent={<Folders size={25} color="#fdfcfc" weight="fill" />}
                description="Selecione o tema dessa pergunta"
              >
                  {
                    (tema) => <SelectItem key={tema.id} startContent={<Icone icone={tema.icone} tamanho={25}/>}>{tema.tema.toUpperCase()}</SelectItem>
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
              variant='flat' color='success' className='text-xl p-6'
              endContent={ loading ? 
                <Spinner color='success' />
              : 
                <Upload size={48} color="#17C964" weight="fill" /> 
              }
            >
              {acao == 'edicao' ? 'Salvar' : "Publicar"}
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
    </Modal>
  )
  }



ModalPerguntas.propTypes = {
  isOpen: P.bool,
  acao: P.string
}

export default ModalPerguntas