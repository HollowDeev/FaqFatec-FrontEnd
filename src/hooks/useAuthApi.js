import axios from "axios"

export const useAuthApi = () => ({

    validarToken: async (token) => {
        try{
            const usuarioResponse = await axios.get('http://127.0.0.1:8000/api/l2/me', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
    
            if(usuarioResponse.data){
                return ({
                    id:  usuarioResponse.data.id,
                    nome: usuarioResponse.data.name,
                    level:  usuarioResponse.data.level,
                    email:  usuarioResponse.data.email,
                }) 
            }else {
                return null
            }
        } catch{
            return null
        }
    },

    entrar: async (email, senha) => {
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: email,
                password: senha
            })

            const responseData = await response.data
            
            const usuario = {
                id:  responseData.user.id,
                nome: responseData.user.name,
                level:  responseData.user.level,
                email:  responseData.user.email,
                token: responseData.token
            }

            return(usuario)
        } catch{
            return Promise.reject(new Error("Usuário inválido"))
        }

    }

})