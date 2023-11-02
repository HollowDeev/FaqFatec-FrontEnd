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

    mudarSenha: (dispatch, colaborador) => {
        return dispatch({type: 'mudarSenha', colaborador})
    },

    adicionarColaborador: (dispatch) => {
        return dispatch({type: 'adicionarColaborador'})
    },

    fechar: (dispatch) => {
        return dispatch({type: "fechar"})
    }

})