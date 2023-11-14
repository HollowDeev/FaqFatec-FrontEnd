import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from '@nextui-org/react'
import P from 'prop-types'
import { useContext } from 'react'
import temaContexto from '../../context/TemaContexto'
import useGerenciadorContexto from '../../hooks/useGerenciadorContexto'
import { useGerenciador } from '../../hooks/useGerenciador'
import { useState } from 'react'
import { useEffect } from 'react'
import { EnvelopeSimple, Eye, EyeSlash, Password, Textbox, Upload, XCircle } from '@phosphor-icons/react'
import { AuthContext } from '../../context/Auth/AuthProvider'
import { useActionsApi } from '../../hooks/useActionsApi'
import dataContexto from '../../context/Data/dataContexto'



// eslint-disable-next-line react/prop-types
const ModalColaboradores = ({isOpen, acao}) => {
  
  const {tema: temaSistema} = useContext(temaContexto)

  const { onOpenChange } = useDisclosure()

  const {gerenciamento, gerenciar} = useGerenciadorContexto()
  const gerenciador = useGerenciador()

  const actionsApi = useActionsApi()
  const {parametrosRequisicao} = useContext(AuthContext)

  const {recarregarDadosColaboradores} = useContext(dataContexto)
  const [loading, setLoading] = useState(false)

  // Estados para os dados necessarios para o gerenciamento
  const [nome, definirNome] = useState(null)
  const [email, definirEmail] = useState(null)
  const [senha, definirSenha] = useState(null)
  const [confirmarSenha, definirConfirmarSenha] = useState(null)

  // Estados de erro
  const [erro, definirErro] = useState(false)
  const [mensagemErro, definirMensageErro] = useState('')

  const [senhaVisivel, definirSenhaVisivel] = useState(false)
  const [confirmarSenhaVisivel, definirConfirmarSenhaVisivel] = useState(false)

  const toggleSenhaVisivel = () => definirSenhaVisivel(!senhaVisivel)
  const toggleConfirmarSenhaVisivel = () => definirConfirmarSenhaVisivel(!confirmarSenhaVisivel)

  // Sistema verificação entre a Senha e o Confirmar Senha
  useEffect(() => {
    if(senha != confirmarSenha){
      definirErro(true)
      definirMensageErro('Senhas não coincidem')
    } else {
      definirErro(false)
      definirMensageErro()
    }
  }, [senha, confirmarSenha])

  // Sistema para armazenar o nome pelo contexto, em caso de troca de senha
  useEffect(() => {
    definirNome(gerenciamento[2].nome)
  }, [gerenciamento])


  // Funções de ação - Cancelar e salvar/adicionar
  const btnCancelar = () => {
    definirEmail(null)
    definirNome(null)
    definirSenha(null)
    definirConfirmarSenha(null)
    gerenciador.fechar(gerenciar)
  }

  const btnFinalizar = async () => {
    if(!loading && !erro){
      setLoading(true)
      if(gerenciamento[2].mudarSenha){
        const id = gerenciamento[2].idColaborador
        await actionsApi.mudarSenha( senha, parametrosRequisicao, id)
      }else {
        await actionsApi.adicionarColaboradores(nome, email, senha, parametrosRequisicao)
        recarregarDadosColaboradores()
      }
      definirEmail(null)
      definirNome(null)
      definirSenha(null)
      definirConfirmarSenha(null)
      setLoading(false)
      gerenciador.fechar(gerenciar)
    }
  }

  switch(acao){
    case 'mudarSenha':
      return (
        <Modal className={temaSistema} isOpen={isOpen} onOpenChange={onOpenChange} size='5xl' scrollBehavior='inside' >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex justify-center'>
                  <h1 className="text-2xl sm:text-3xl font-bold my-5 text-foreground text-center">
                    <span className="text-content6">Nova </span>
                    Senha para <br /> 
                    <p className='font-medium'>{nome}</p>
                  </h1>
              </ModalHeader>
              <ModalBody>
                <div>
                  <Input size={'lg'} className='text-foreground' label="Senha:" description="Digite a nova senha" isRequired value={senha} 
                  onChange={(e) => definirSenha(e.target.value)} type={senhaVisivel ? 'text' : 'password'} isInvalid={erro}  errorMessage={mensagemErro} startContent={<Password size={25} color="#f9f1f1" weight="fill" /> }  placeholder='Nova Senha' 
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleSenhaVisivel}>
                      {senhaVisivel ? (
                        <Eye size={25} color="#f9f1f1" weight="fill" />
                      ) : (
                        <EyeSlash size={25} color="#f9f1f1" weight="fill" />
                      )}
                    </button>}
                  />
                </div>
                <div>
                <Input size={'lg'} className='text-foreground' label="Confirmar senha:" description="Digite novamente a nova senha" isRequired value={confirmarSenha} 
                  onChange={(e) => definirConfirmarSenha(e.target.value)} type={confirmarSenhaVisivel ? 'text' : 'password'}  isInvalid={erro}  errorMessage={mensagemErro} startContent={<Password size={25} color="#f9f1f1" weight="fill" />} placeholder='Confirme a nova Senha' 
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleConfirmarSenhaVisivel}>
                      {confirmarSenhaVisivel ? (
                        <Eye size={25} color="#f9f1f1" weight="fill" />
                      ) : (
                        <EyeSlash size={25} color="#f9f1f1" weight="fill" />
                      )}
                    </button>}
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
                  endContent={ loading ? 
                    <Spinner color='success' />
                  : 
                    <Upload size={48} color="#17C964" weight="fill" /> 
                  }
                >
                  Salvar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        </Modal>
      )

    case 'adicao':
      return (
        <Modal className={temaSistema} isOpen={isOpen} onOpenChange={onOpenChange} size='5xl' scrollBehavior='inside' >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex justify-center'>
                  <h1 className="text-2xl sm:text-3xl font-bold my-5 text-foreground text-center">
                    <span className="text-content6">Adicionar </span>
                    Colaborador
                  </h1>
              </ModalHeader>
              <ModalBody>
                <div>
                  <Input size={'lg'} className='text-foreground' label="Nome:" description="Digite o nome completo do colaborador" isRequired value={nome} 
                  onChange={(e) => definirNome(e.target.value)} isInvalid={erro}  errorMessage={mensagemErro} startContent={<Textbox size={25} color="#f9f1f1" weight="fill" /> } placeholder='Nome do colaborador'/>
                </div>
                <div>
                  <Input size={'lg'} className='text-foreground' label="Email:" description="Digite o email institucional do colaborador" isRequired value={email} 
                  onChange={(e) => definirEmail(e.target.value)} isInvalid={erro}  errorMessage={mensagemErro} startContent={<EnvelopeSimple size={25} color="#f9f1f1" weight="fill" />} placeholder='Email institucional'/>
                </div>
                <div>
                  <Input size={'lg'} className='text-foreground' label="Senha:" description="Digite a nova senha" isRequired value={senha} 
                  onChange={(e) => definirSenha(e.target.value)} type={senhaVisivel ? 'text' : 'password'} isInvalid={erro}  errorMessage={mensagemErro} startContent={<Password size={25} color="#f9f1f1" weight="fill" /> } placeholder='Nova Senha' 
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleSenhaVisivel}>
                      {senhaVisivel ? (
                        <Eye size={25} color="#f9f1f1" weight="fill" />
                      ) : (
                        <EyeSlash size={25} color="#f9f1f1" weight="fill" />
                      )}
                    </button>}
                  />
                </div>
                <div>
                <Input size={'lg'} className='text-foreground' label="Confirmar senha:" description="Digite novamente a nova senha" isRequired value={confirmarSenha} 
                  onChange={(e) => definirConfirmarSenha(e.target.value)} type={confirmarSenhaVisivel ? 'text' : 'password'}  isInvalid={erro}  errorMessage={mensagemErro} startContent={<Password size={25} color="#f9f1f1" weight="fill" />} placeholder='Confirme a nova Senha' 
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleConfirmarSenhaVisivel}>
                      {confirmarSenhaVisivel ? (
                        <Eye size={25} color="#f9f1f1" weight="fill" />
                      ) : (
                        <EyeSlash size={25} color="#f9f1f1" weight="fill" />
                      )}
                    </button>}
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
                  endContent={ loading ? 
                    <Spinner color='success' />
                  : 
                    <Upload size={48} color="#17C964" weight="fill" /> 
                  }
                >
                  Cadastrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        </Modal>
      )
  }
  }

  ModalColaboradores.propTypes = {
  isOpen: P.bool,
  acao: P.string
}

export default ModalColaboradores