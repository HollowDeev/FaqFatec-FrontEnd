import axios from "axios"

export const useDataApi = () => ({
    buscarDados: async() => {
        const response = await axios.get("http://127.0.0.1:8000/api/3.1")
        const dados = response.data
        return dados
    },

    buscarColaboradores: async({baseURL, headers}) => {
        const response = await axios.get(`${baseURL}/users`, {headers: headers})
        const colaboradores = response.data

        return colaboradores
    }
})