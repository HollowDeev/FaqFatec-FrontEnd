import { useContext, useState } from "react"
import { AuthContext } from "../../context/Auth/AuthProvider"
import { Button, Input, Progress } from "@nextui-org/react"
import { Eye, EyeSlash } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
// import { useEffect } from "react"


export const Login = () => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [erro, definirErro] = useState("")

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const {entrar} = useContext(AuthContext)

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

  return (
    <div className="flex flex-col justify-center items-center  gap-5">
        
        {loading === false ? 
            <>
                <h1 className="text-3xl font-bold">
                    <span className="text-content6">Login</span> 
                </h1>
                <hr />
                <form className="flex flex-col gap-2 w-[300px]">
                    <Input type="text" label="email" isRequired size="sm" onChange={(e) => setEmail(e.target.value)}
                    isInvalid={erro ? true : false}
                    errorMessage={erro}
                    />
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
                </form>
                {
                email == "" || senha == "" ? <Button isDisabled onClick={() => handleButton()}>Entrar</Button> : <Button onClick={() => handleButton()}>Entrar</Button>
                }
            </>
            :
            <div className="w-full flex flex-col justify-center items-center">
                <h1 className="text-2xl  mb-5">Verificando suas credenciais</h1>
                <Progress size="md" isIndeterminate aria-label="Loading..." className="max-w-sm" 

                color="danger"
                />
                
            </div>
        }
        

    </div>
  )
}
