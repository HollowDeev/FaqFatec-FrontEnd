export const useGerenciadorReducer = () => ({
    funcaoReducerGerenciamento: (state, action) => {
        switch(action.type) {
            case 'editarPergunta':
                return [
                    {
                        editarPergunta: true,
                        adicionarPergunta: false,
                        responderPergunta: false,
                        idPergunta: action.pergunta.id,
                        pergunta: action.pergunta.pergunta,
                        resposta: action.pergunta.resposta,
                        tema: action.pergunta.tema,
                        estado: action.estado
                    },
                    state[1],
                    state[2],
                    state[3]   
                ]
    
            case 'adicionarPergunta':
            return [
                {
                    editarPergunta: false,
                    adicionarPergunta: true,
                    responderPergunta: false,
                    idPergunta: null,
                    pergunta: '',
                    resposta: '',
                    tema: '',
                    estado: ''
                },
                state[1],
                state[2],
                state[3]   
            ]
    
            case 'responderPergunta':
                return [
                    {
                        editarPergunta: false,
                        adicionarPergunta: true,
                        responderPergunta: true,
                        idPergunta: action.pergunta.id,
                        pergunta: action.pergunta.pergunta,
                        resposta: '',
                        tema: '',
                        estado: ''
                    },
                    state[1],
                    state[2],
                    state[3]   
                ]
    
            case 'fechar':
                return [
                    {
                        editarPergunta: false,
                        adicionarPergunta: false,
                        responderPergunta: false,
                        idPergunta: null,
                        pergunta: '',
                        resposta: '',
                        tema: '',
                        estado: ''
                    },
                    {
                        editarTema: false,
                        adicionarTema: false,
                        idTema: null,
                        nome: '',
                        icone: ''
                    },
                    {
                        mudarSenha: false,
                        adicionarColaborador: false,
                        nome: '',
                        idColaborador: '',
                        email: '',
                        senha: '',
                        nivel: 1
                    },
                    {
                        tipo: '',
                        titulo: '',
                        exibir: false,
                        mensagem: '',
                        funcao: '',
                        tipoFuncao: '',
                    }
                ]
    
            case 'editarTema':
                return [
                    state[0],
                    {
                        editarTema: true,
                        adicionarTema: false,
                        idTema: action.tema.id,
                        nome: action.tema.tema,
                        icone: action.tema.icone
                    },
                    state[2],
                    state[3]
                ]
    
            case 'adicionarTema':
                return [
                    state[0],
                    {
                        editarTema: false,
                        adicionarTema: true,
                        idTema: null,
                        nome: '',
                        icone: ''
                    },
                    state[2],
                    state[3]
                ]
    
            case 'mudarSenha':
                return [
                    state[0],
                    state[1],
                    {
                        mudarSenha: true,
                        adicionarColaborador: false,
                        nome: action.colaborador.name,
                        idColaborador: action.colaborador.id,
                        email: '',
                        senha: '',
                        nivel: 1
                    },
                    state[3]
                ]
    
            case 'adicionarColaborador':
                return [
                    state[0],
                    state[1],
                    {
                        mudarSenha: false,
                        adicionarColaborador: true,
                        nome: '',
                        idColaborador: '',
                        email: '',
                        senha: '',
                        nivel: 1
                    },
                    state[3]
                ]

            case 'abrirAlerta':
                return [
                    state[0],
                    state[1],
                    state[2],
                    {
                        tipo: action.alerta.tipo,
                        titulo: action.alerta.titulo,
                        exibir: true,
                        mensagem: action.alerta.mensagem,
                        funcao: action.alerta.funcao,
                        dadosFuncao: action.alerta.dadosFuncao
                    }
                ]
    
            default:
                return [ ...state]
        }
    },

    valorInicialGerenciamento: [
        {
            editarPergunta: false,
            adicionarPergunta: false,
            responderPergunta: false,
            idPergunta: null,
            pergunta: '',
            resposta: '',
            tema: '',
            estado: ''
        },
        {
            editarTema: false,
            adicionarTema: false,
            idTema: null,
            nome: '',
            icone: ''
        },
        {
            mudarSenha: false,
            adicionarColaborador: false,
            nome: '',
            idColaborador: '',
            email: '',
            senha: '',
            nivel: 1
        },
        {
            tipo: '',
            titulo: '',
            exibir: false,
            mensagem: '',
            funcao: '',
            dadosFuncao: ''
        }
    ],

    valorInicialGerenciamentoErros: {

    }
})