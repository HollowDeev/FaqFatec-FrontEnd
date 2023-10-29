import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import P from 'prop-types'
import { useContext } from 'react'
import temaContexto from '../../context/TemaContexto'
import useGerenciadorContexto from '../../hooks/useGerenciadorContexto'
import { useGerenciador } from '../../hooks/useGerenciador'
import EditorTexto from '../EditorTexto/EditorTexto'
import { useState } from 'react'
import { useEffect } from 'react'
import { Folders, Upload, XCircle } from '@phosphor-icons/react'
import { temas } from '../../data/temas'
import Icone from '../Icone/Icone'





// eslint-disable-next-line react/prop-types
const ModalPerguntas = ({isOpen, acao}) => {
  
  const {tema: temaSistema} = useContext(temaContexto)

  const { onOpenChange } = useDisclosure()
  const {gerenciamento, gerenciar} = useGerenciadorContexto()
  const gerenciador = useGerenciador()

  const [pergunta, definirPergunta] = useState('')
  const [resposta, definirResposta] = useState('')
  const [tema, definirTema] = useState(new Set([]))

  useEffect(() => {
    definirPergunta(gerenciamento[0].pergunta)
    definirResposta(gerenciamento[0].resposta)
    definirTema(new Set([gerenciamento[0].tema]))
    
  }, [gerenciamento])

  const btnCancelar = () => {
    gerenciador.fechar(gerenciar)
  }

  const btnFinalizar = () => {
    console.log(pergunta)
    console.log(resposta)
    console.log(tema.currentKey)
    gerenciador.fechar(gerenciar)
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
              :
              <h1 className="text-2xl sm:text-3xl font-bold my-5 text-foreground">
                <span className="text-content6">Adicionar </span>
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
              <Select
                labelPlacement='outside'
                label="Tema:"
                items={temas}
                className="text-foreground"
                selectedKeys={tema}
                onSelectionChange={definirTema}
                startContent={<Folders size={25} color="#fdfcfc" weight="fill" />}
                description="Selecione o tema dessa pergunta"
              >
                {
                  (tema) => <SelectItem key={tema.nome} startContent={<Icone icone={tema.icone} tamanho={25}/>}>{tema.nome.toUpperCase()}</SelectItem>
                }
              </Select>
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