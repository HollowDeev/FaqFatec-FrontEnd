export const useGerenciador = () => ({

    editarPerguntas: (dispatch, pergunta, estado) => {
        return dispatch({type: "editarPergunta", pergunta, estado})
    },

    adicionarPergunta: (dispatch) => {
        return dispatch({type: "adicionarPergunta"})
    },

    responderPergunta: (dispatch, pergunta) => {
        return dispatch({type: 'responderPergunta', pergunta})
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

    buscarColaboradores: (dispatch) => {
        return dispatch({type: 'buscarColaboradores'})
    },

    fechar: (dispatch) => {
        return dispatch({type: "fechar"})
    }

})