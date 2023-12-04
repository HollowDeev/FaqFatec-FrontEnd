import { Button, Input, Spinner } from "@nextui-org/react"
import { EnvelopeOpen, Eye, EyeSlash, IdentificationCard, Password } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { useActionsApi } from "../../hooks/useActionsApi"
import { useNavigate } from "react-router-dom"
import temaContexto from "../../context/TemaContexto"
import { useContext } from "react"

const Registro = () => {

  const { foreground } = useContext(temaContexto)

  const [confirmarSenhaVisivel, definirConfirmarSenhaVisivel] = useState()
  const [senhaVisivel, definirSenhaVisivel] = useState()

  const [nome, definirNome] = useState("")
  const [email, definirEmail] = useState("")
  const [senha, definirSenha] = useState('')
  const [confirmarSenha, definirConfirmarSenha] = useState('')

  const [senhasIguais, definirSenhasIguais] = useState(false)
  const [mensagemErroSenha, definirMensagemErroSenha] = useState('')

  const [mensagemErroEmail, definirMensagemErroEmail] = useState('')

  const [erroGlobal, definirErroGlobal] = useState('')

  const [loading, definirLoading] = useState(false)

  const actionsApi = useActionsApi()
  const navigate = useNavigate()

  const toggleConfirmarSenhaVisivel = () => definirConfirmarSenhaVisivel(!confirmarSenhaVisivel)
  const toggleSenhaVisivel = () => definirSenhaVisivel(!senhaVisivel)

  useEffect(() => {
    if (confirmarSenha != '' && senha != confirmarSenha) {
      definirMensagemErroSenha('As senhas são diferentes')
      definirSenhasIguais(false)
    } else if (confirmarSenha != '' && senha != '' && senha == confirmarSenha) {
      definirSenhasIguais(true)
      definirMensagemErroSenha('')
    } else {
      definirSenhasIguais(false)
    }

    const formatoEmailValido = /@fatec\.sp\.gov\.br$/.test(email);

    if (!formatoEmailValido && email.includes('@')) {
      definirMensagemErroEmail('O email deve ser do domínio @fatec.sp.gov.br');
    } else {
      definirMensagemErroEmail('');
    }

  }, [senha, confirmarSenha, nome, email])


  const handleButton = async () => {
    const cadastroAutorizado = nome !== '' && email !== '' && senha !== '' && confirmarSenha !== '' && mensagemErroEmail == ''
    if (cadastroAutorizado) {
      try {
        definirLoading(true)
        await actionsApi.criarConta(nome, email, senha)
        definirLoading(false)
        navigate('/login')
      } catch (e) {
        definirErroGlobal(e)
        definirLoading(false)
      }
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center gap-10">
        <h1 className="text-3xl font-bold">
          <span className="text-content6">Criar </span>
          Conta
        </h1>
        <div className="w-96 flex flex-col gap-8">
          <Input label='Nome Completo :' placeholder="ex: Thauã Felipe dos Santos" size='lg' startContent={
            <IdentificationCard size={30} color={foreground} weight="duotone" />
          }
            labelPlacement="outside"
            type='text'

            value={nome}
            onChange={(e) => definirNome(e.target.value)}

          />

          <Input label='Email :' placeholder="Insira seu email" size='lg' startContent={
            <EnvelopeOpen size={30} color={foreground} weight="duotone" />
          }
            labelPlacement="outside"
            type='text'

            value={email}
            onChange={(e) => definirEmail(e.target.value)}
            isInvalid={mensagemErroEmail ? true : false}
            errorMessage={mensagemErroEmail}
          />

          <Input label='Senha :' placeholder="Insira a senha" size='lg' startContent={
            <Password size={30} color={foreground} weight="duotone" />
          }
            labelPlacement="outside"
            type={senhaVisivel ? 'text' : 'password'}
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleSenhaVisivel}>
                {senhaVisivel ? (
                  <Eye size={25} color={foreground} weight="fill" />
                ) : (
                  <EyeSlash size={25} color={foreground} weight="fill" />
                )}
              </button>}
            value={senha}
            onChange={(e) => definirSenha(e.target.value)}
            isInvalid={mensagemErroSenha ? true : false}
            errorMessage={mensagemErroSenha}
          />

          <Input label='Confirme a Senha :' placeholder="Insira novamente a senha" size='lg' startContent={
            <Password size={30} color={foreground} weight="duotone" />
          }
            labelPlacement="outside"
            type={confirmarSenhaVisivel ? 'text' : 'password'}
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleConfirmarSenhaVisivel}>
                {confirmarSenhaVisivel ? (
                  <Eye size={25} color={foreground} weight="fill" />
                ) : (
                  <EyeSlash size={25} color={foreground} weight="fill" />
                )}
              </button>}
            value={confirmarSenha}
            onChange={(e) => definirConfirmarSenha(e.target.value)}
            isInvalid={mensagemErroSenha ? true : false}
            errorMessage={mensagemErroSenha}
          />
        </div>
        {erroGlobal != '' &&
          <div className="flex items-center gap-2">
            <p className="bg-content5 px-2">Falha ao criar a conta pois: </p>
            <span>{erroGlobal}</span>
          </div>
        }
        {senhasIguais ?
          <Button variant="ghost" color="success" className="font-bold" onClick={() => handleButton()}>Criar Conta</Button>
          :
          <Button variant="ghost" color="success" className="font-bold" isDisabled>Criar Conta</Button>
        }
        {loading && <Spinner color='success' />}
      </div>
    </div>
  )
}

export default Registro