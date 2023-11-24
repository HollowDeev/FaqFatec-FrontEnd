import { useContext, useState } from "react"
import { AuthContext } from "../../context/Auth/AuthProvider"
import { Button, Input, Progress, Spinner } from "@nextui-org/react"
import { Eye, EyeSlash } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useGerenciador } from "../../hooks/useGerenciador"
import { useActionsApi } from "../../hooks/useActionsApi"
import useGerenciadorContexto from "../../hooks/useGerenciadorContexto"
import Alerta from "../../components/Alerta/Alerta"



export const Login = () => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [erro, definirErro] = useState("")
    const [modoExibicao, definirModoExibicao] = useState('login')

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const {entrar} = useContext(AuthContext)

    const actionsApi = useActionsApi()

    const { gerenciar } = useGerenciadorContexto()
    const gerenciador = useGerenciador()

    useEffect(() => {
        
        const formatoEmailValido = /@fatec\.sp\.gov\.br$/.test(email);

        if (!formatoEmailValido && email.includes('@')) {
          definirErro('O email deve ser do domínio @fatec.sp.gov.br');
        } else {
          definirErro('');
        }

    }, [ email])


    const handleButton = async ()  => {
        setLoading(true)
        try{
            await entrar(email, senha)
            navigate('/')
        }catch(e){
            definirErro(e.message)
        }
        setLoading(false)
    }

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const recuperarSenha = async () => {
        if(email != ''){
            setLoading(true)
            try{
                await actionsApi.recuperarConta(email)
                const alerta = {
                    tipo: 'notificacao',
                    titulo: 'Email de recuperação enviado',
                    mensagem: 'Enviamos um email contendo uma senha temporaria para o seu email. Acesse o sistema com a senha temporaria e cadastre uma nova senha para a sua conta.',
                    funcao: '',
                    dadosFuncao: ''
                }
                gerenciador.exibirAlerta(gerenciar, alerta)
            }catch(e){
                definirErro(e.message)
            }
            setLoading(false)
        }else {
            definirErro('Preencha o seu email para recuperarmos a sua conta')
        }
    }

  return (
    <div className="flex flex-col justify-center items-center  gap-5">
        <Alerta />
        {loading === false ? 
            <>
                <h1 className="text-3xl font-bold">
                    {modoExibicao == 'login' ?
                        <span className="text-content6">Login</span> 
                    :
                        <span className="text-content6">Recuperar Senha</span> 
                    }
                </h1>
                <hr />
                <form className="flex flex-col gap-2 w-[300px]">
                    <Input type="text" label="email" isRequired size="sm" onChange={(e) => setEmail(e.target.value)}
                    isInvalid={erro ? true : false}
                    errorMessage={erro}
                    />

                    {modoExibicao == 'login' &&
                        <Input type={isVisible ? "text" : "password"} label="senha" isRequired size="sm" onChange={(e) => setSenha(e.target.value)} 
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <Eye size={20} color="#fdfcfc" weight="fill" />
                            ) : (
                                <EyeSlash size={20} color="#fdfcfc" weight="fill" />
                            )}
                            </button>
                        } 
                        isInvalid={erro ? true : false}
                        errorMessage={erro}
                        />
                    }
                    
                <span onClick={() => modoExibicao == 'login' ? definirModoExibicao('recuperarSenha') : definirModoExibicao('login')} className="opacity-40 hover:text-content5 hover:opacity-100 font-semibold px-2 cursor-pointer text-sm">
                    {modoExibicao == 'login' ?
                        'Esqueceu sua senha?'
                    :
                        'Voltar para login'
                    }
                </span>
                </form>
                {modoExibicao == 'login' ?
                    email == "" || senha == "" ? <Button isDisabled >Prencha os campos</Button> 
                    : 
                    <Button onClick={() => handleButton()}>Entrar</Button>
                :
                    email == "" ? <Button isDisabled >Prencha o Email</Button> 
                    : 
                    <Button onClick={() => recuperarSenha()}>Recuperar</Button>
                }
            </>
            :
            modoExibicao == 'login' ?
                <div className="w-full flex flex-col justify-center items-center">
                    <h1 className="text-2xl  mb-5">Verificando suas credenciais</h1>
                    
                    <Progress size="md" isIndeterminate aria-label="Loading..." className="max-w-sm" 

                    color="danger"
                    />
                    
                </div>
                :
                <div className="w-full flex flex-col justify-center items-center">
                    <h1 className="text-2xl  mb-5">Enviando o email de recuperação</h1>
                    
                    <Spinner color="success" />
                    
                    
                </div>
                
        }
        

    </div>
  )
}
