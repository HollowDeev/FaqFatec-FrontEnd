import { usuarios } from "../data/usuarios"

export const useAuthApi = () => ({

    validarToken: async (token) => {
        const usuario = usuarios.find(user => user.token === token)

        if(usuario){
            return Promise.resolve({
                nome: usuario.nome,
                email: usuario.email,
                level: usuario.level,
            }) 
        }else {
            return null
        }
    },

    entrar: async (email, senha) => {

        const usuario = usuarios.find(user => user.email === email && user.senha === senha)
        if(usuario){
            return Promise.resolve({
                nome: usuario.nome,
                email: usuario.email,
                level: usuario.level,
                token: usuario.token
            })
        }else {
            return Promise.reject(new Error("Usuário inválido"))
        }

    }

})