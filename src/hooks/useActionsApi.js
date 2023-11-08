import axios from "axios"

export const useActionsApi = () => ({

    adicionarPergunta: async (pergunta, resposta, tema, {baseURL, headers, user_id}) => {
        await axios.post(`${baseURL}/pr`, {
                pergunta, 
                resposta,
                tema_id: tema,
                user_id
            }, {
                headers: headers
            }
        )

    },

    deletarPergunta: async (perguntaId, {baseURL, headers}) => {
        await axios.delete(`${baseURL}/delpr/${perguntaId}`, {headers: headers})
        console.log(perguntaId)
    },

    adicionarTema: async (tema, icone, {baseURL, headers, user_id}) => {
        await axios.post(`${baseURL}/tema`, {
            tema,
            icone,
            user_id
        }, {
            headers: headers
        })
    },

    deletarTema: async(temaId, {baseURL, headers}) => {
        await axios.delete(`${baseURL}/tema/${temaId}`, {headers: headers})
        // console.log(temaId)
    },

    listarColaboradores: async({baseURL, headers}) => {
        const response = await axios.get(`${baseURL}/users`, {headers: headers})
        const colaboradores = response.data

        return colaboradores
    },

    adicionarColaboradores: async(nome, email, senha, {baseURL, headers}) => {
        await axios.post(`${baseURL}/user`, {
            name: nome,
            level: 1,
            email,
            password: senha
        }, {headers: headers})
    },

    removerColaboradores: async(colaborador_id, {baseURL, headers}) => {
        await axios.delete(`${baseURL}/user/${colaborador_id}`, {headers: headers})
    }
    
})