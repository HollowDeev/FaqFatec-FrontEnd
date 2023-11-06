import axios from "axios"

export const useDataApi = () => ({
    buscarDados: async() => {
        const response = await axios.get("http://127.0.0.1:8000/api/3.1")
        const dados = response.data
        return dados
    }
})