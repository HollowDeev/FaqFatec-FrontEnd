import axios from "axios"

export const useAuthApi = () => ({

    validarToken: async (token) => {
        try{
            const responseData = await axios.get('http://127.0.0.1:8000/api/l2/me', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            console.log(responseData.data)
    
            if(responseData.data){
                const usuario = {
                    id:  responseData.data.user.id,
                    nome: responseData.data.user.name,
                    level:  responseData.data.user.level,
                    email:  responseData.data.user.email,
                }

                const pergunta = responseData.data.perguntas
                
                console.log({usuario, pergunta})

                return ({usuario, pergunta}) 
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

            const pergunta = responseData.pergunta

            return({usuario, pergunta})
        } catch{
            return Promise.reject(new Error("Usuário inválido"))
        }

    }

})