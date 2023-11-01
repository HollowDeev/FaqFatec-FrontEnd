export const useGerenciador = () => ({

    editarPerguntas: (dispatch, pergunta) => {
        return dispatch({type: "editarPergunta", pergunta})
    },

    adicionarPergunta: (dispatch) => {
        return dispatch({type: "adicionarPergunta"})
    },

    editarTema: (dispatch, tema) => {
        return dispatch({type: 'editarTema', tema})
    },

    adicionarTema: (dispatch) => {
        return dispatch({type: 'adicionarTema'})
    },

    fechar: (dispatch) => {
        return dispatch({type: "fechar"})
    }

})