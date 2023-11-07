import { useContext, useState } from "react"
import { AuthContext } from "../../context/Auth/AuthProvider"
import { Button, Input } from "@nextui-org/react"
import { Eye, EyeSlash } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
// import { useEffect } from "react"


export const Login = () => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [erro, setErro] = useState("")

    const navigate = useNavigate()
    const {entrar} = useContext(AuthContext)

    // useEffect(() => {
    //     if(autorizacao){
    //         navigate('/')
    //     }
    // },[autorizacao, navigate])

    const handleButton = async ()  => {
        try{
            await entrar(email, senha)
            navigate('/')
        }catch(e){
            setErro(e.message)
        }
    }

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex flex-col justify-center items-center  gap-5">
        <h1>login</h1>
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

    </div>
  )
}
