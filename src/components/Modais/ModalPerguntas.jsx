import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import P from 'prop-types'
import { useContext } from 'react'
import temaContexto from '../../context/TemaContexto'
import useGerenciadorContexto from '../../hooks/useGerenciadorContexto'
import { useGerenciador } from '../../hooks/useGerenciador'
import EditorTexto from '../EditorTexto/EditorTexto'
import { useState } from 'react'
import { useEffect } from 'react'
import { Upload, XCircle } from '@phosphor-icons/react'





// eslint-disable-next-line react/prop-types
const ModalPerguntas = ({isOpen, acao}) => {
  
  const {tema} = useContext(temaContexto)

  const { onOpenChange } = useDisclosure()
  const {gerenciamento, gerenciar} = useGerenciadorContexto()
  const gerenciador = useGerenciador()

  const [pergunta, definirPergunta] = useState('')

  const [resposta, definirResposta] = useState('')

  useEffect(() => {
    definirPergunta(gerenciamento[0].pergunta)
    definirResposta(gerenciamento[0].resposta)
  }, [gerenciamento])

  const btnCancelar = () => {
    gerenciador.fechar(gerenciar)
  }

  const btnFinalizar = () => {
    console.log(pergunta)
    console.log(resposta)
    gerenciador.fechar(gerenciar)
  }


  return (
    <Modal className={tema} isOpen={isOpen} onOpenChange={onOpenChange} size='5xl' scrollBehavior='inside' >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className='flex justify-center'>
            <h1 className="text-2xl sm:text-3xl font-bold my-5 text-foreground">
              Perguntas
              <span className="text-content6"> Online</span>
            </h1>
          </ModalHeader>
          <ModalBody>
            <div>
              <Input size={'lg'} className='text-foreground' label="Pergunta:" description="Digite a pergunta" isRequired value={acao == 'edicao' && pergunta} 
              onChange={(e) => definirPergunta(e.target.value)}
              />
            </div>
            <div>
              <p className='text-foreground mb-2'>Resposta: *</p>
              <EditorTexto 
                textoInicial={acao == 'edicao' && resposta}
                onChange={definirResposta}
              />
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
              endContent={
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