export const useGerenciador = () => ({

    editarPerguntas: (dispatch, pergunta) => {
        return dispatch({type: "editarPergunta", pergunta})
    },

    adicionarPergunta: (dispatch) => {
        return dispatch({type: "adicionarPergunta"})
    },

    fechar: (dispatch) => {
        return dispatch({type: "fechar"})
    }

})