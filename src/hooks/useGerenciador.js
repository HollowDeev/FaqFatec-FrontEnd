export const useGerenciador = () => ({

    editarPerguntas: (dispatch, pergunta) => {
        return dispatch({type: "editarPergunta", pergunta})
    },

    fechar: (dispatch) => {
        return dispatch({type: "fechar"})
    }

})