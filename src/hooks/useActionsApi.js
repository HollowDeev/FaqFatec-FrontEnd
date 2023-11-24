import axios from "axios"

export const useActionsApi = () => ({

    adicionarPergunta: async (pergunta, resposta, estado, tema, {baseURL, headers, user_id}) => {
        await axios.post(`${baseURL}/pr`, {
                pergunta, 
                resposta,
                tema_id: tema,
                user_id,
                pergunta_estado: estado
            }, {
                headers: headers
            }
        )

    },

    deletarPergunta: async (perguntaId, {baseURL, headers}) => {
        await axios.delete(`${baseURL}/delpr/${perguntaId}`, {headers: headers})

    },

    salvarEdicaoPergunta: async (pergunta, resposta, estado, tema_id, id, {baseURL, headers}) => {
        await axios.patch(`${baseURL}/updatepr/${id}`, {
            pergunta,
            resposta,
            tema_id,
            pergunta_estado: estado
        }, {headers:headers})
    },

    marcarPerguntaVisualizada: async(id, {baseURL, headers}) => {
        await axios.post(`${baseURL}/visualizado/${id}`,{}, {headers:headers})
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
    },

    salvarEdicaoTema: async(id, tema, icone, {baseURL, headers}) => {
        await axios.patch(`${baseURL}/tema/${id}`, {
            tema,
            icone
        }, {headers:headers})
    },

    mudarSenha: async(senha, {baseURL, headers, user_id, level}, id = false) => {
        if(!id){
            await axios.patch(`${baseURL}/user/${user_id}`, {
                password: senha
            }, {headers: headers})
        }else {
            if(level == 2){
                await axios.patch(`${baseURL}/user/${id}`, {
                    password: senha
                }, {headers: headers})
            }
        }
    },

    criarConta: async(nome, email, senha) => {
        try{
            await axios.post('http://127.0.0.1:8000/api/user', {
                name: nome,
                level: 0,
                email,
                password: senha
            })
        }catch(e){
            // console.log(e)
            return Promise.reject(e.response.data.errors.email[0])
        }
    },

    perguntar: async(pergunta, {baseURL, headers, user_id}) => {
        await axios.post(`${baseURL}/pergs`, {
            user_id,
            pergunta
        }, {headers: headers})
    },

    recuperarConta: async(email) => {
        await axios.post(`http://127.0.0.1:8000/api/esqueci-minha-senha`, {email}, {})
    }
    
})