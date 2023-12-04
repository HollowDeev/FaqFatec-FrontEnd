import { Button, Input, Spinner } from "@nextui-org/react"
import { Eye, EyeSlash, Password } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { AuthContext } from "../../context/Auth/AuthProvider"
import { useActionsApi } from "../../hooks/useActionsApi"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import temaContexto from "../../context/TemaContexto"

const RecuperarSenha = () => {

  const { foreground } = useContext(temaContexto)

  const [confirmarSenhaVisivel, definirConfirmarSenhaVisivel] = useState()
  const [senhaVisivel, definirSenhaVisivel] = useState()

  const [senha, definirSenha] = useState('')
  const [confirmarSenha, definirConfirmarSenha] = useState('')
  const [senhasIguais, definirSenhasIguais] = useState(false)
  const [erro, definirErro] = useState(false)
  const [mensagemErro, definirMensagemErro] = useState('')
  const [loading, definirLoading] = useState(false)

  const { parametrosRequisicao } = useContext(AuthContext)
  const actionsApi = useActionsApi()
  const navigate = useNavigate()

  const toggleConfirmarSenhaVisivel = () => definirConfirmarSenhaVisivel(!confirmarSenhaVisivel)
  const toggleSenhaVisivel = () => definirSenhaVisivel(!senhaVisivel)

  useEffect(() => {
    if (confirmarSenha != '' && senha != confirmarSenha) {
      definirErro(true)
      definirMensagemErro('As senhas são diferentes')
      definirSenhasIguais(false)
    } else if (confirmarSenha != '' && senha != '' && senha == confirmarSenha) {
      definirSenhasIguais(true)
      definirErro(false)
      definirMensagemErro('')
    } else {
      definirSenhasIguais(false)
      definirErro(false)
      definirMensagemErro('')
    }
  }, [senha, confirmarSenha])

  const handleButton = async () => {
    if (parametrosRequisicao) {
      definirLoading(true)
      await actionsApi.mudarSenha(senha, parametrosRequisicao)
      definirLoading(false)
      navigate('/')
    }

  }

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center gap-10">
        <h1 className="text-3xl font-bold">
          <span className="text-content6">Recuperar </span>
          Senha
        </h1>
        <div className="w-96 flex flex-col gap-8">
          <Input label='Nova Senha' placeholder="Insira a sua nova senha" size='lg' startContent={
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
            isInvalid={erro}
            errorMessage={mensagemErro}
          />


          <Input label='Confirme Nova Senha' placeholder="Insira novamente a sua nova senha" size='lg' startContent={
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
            isInvalid={erro}
            errorMessage={mensagemErro}
          />
        </div>
        {senhasIguais ?
          <Button variant="ghost" color="success" className="font-bold" onClick={() => handleButton()}>Cadastrar Nova Senha</Button>
          :
          <Button variant="ghost" color="success" className="font-bold" isDisabled>Cadastrar Nova Senha</Button>
        }
        {loading && <Spinner color='success' />}
      </div>
    </div>
  )
}

export default RecuperarSenha