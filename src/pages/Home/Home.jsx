import { useContext, useEffect, useState } from "react"
import CardPergunta from "../../components/CardPergunta/CardPergunta"
import CardTema from "../../components/CardTema/CardTema"
import { ArrowFatLineLeft } from "@phosphor-icons/react"
import paginaHomeContexto from "../../context/PaginaHome/PaginaHomeContexto"
import { AuthContext } from "../../context/Auth/AuthProvider"
import PesquisaContexto from "../../context/Pesquisa/PesquisaContexto"
import { Button, Spinner, Textarea } from "@nextui-org/react"
import { useActionsApi } from "../../hooks/useActionsApi"
import useGerenciadorContexto from "../../hooks/useGerenciadorContexto"
import { useGerenciador } from "../../hooks/useGerenciador"
import Alerta from "../../components/Alerta/Alerta"

const Home = () => {

  const { gerenciar } = useGerenciadorContexto()
  const gerenciador = useGerenciador()

  const {temaPagina, definirTema} = useContext(paginaHomeContexto)
  const {parametrosRequisicao} = useContext(AuthContext)

  const [alunoLogado, definirALunoLogado] = useState(false)
  const {checarAutorizacao} = useContext(AuthContext)

  const [pergunta, definirPergunta] = useState('')
  const [loading, definirLoading] = useState(false)

  const {idPesquisa, definirIdParaPesquisa} = useContext(PesquisaContexto)

  const actionsApi = useActionsApi()

  useEffect(() => {
    const verificar = async () => {
      const data = await checarAutorizacao()
      const userData = data.usuario

      if(userData && userData.level == 0){
        definirALunoLogado(true)
      }
    }
    verificar()
  }, [])

  const pesquisar = async() => {
    if(parametrosRequisicao){
      definirLoading(true)
      await actionsApi.perguntar(pergunta, parametrosRequisicao)
      definirPergunta('')

      const alerta = {
        tipo: 'notificacao',
        titulo: 'Pergunta Enviada!',
        mensagem: 'Obrigado por nos enviar a sua dúvida! Em breve um administrador irá responde-lá. Fique tranquilo, lhe notificaremos quando sua pergunta for respondida',
        funcao: '',
        dadosFuncao: ""
      }
      
      gerenciador.exibirAlerta(gerenciar, alerta)
      definirLoading(false)
    }
  }


  return (
    
    <div className="lg:w-[1000px] xl:w-[1300px] m-auto sm:px-20 flex flex-col ">
    <Alerta />
    {temaPagina == "inicial" ? 

      <>
        {!idPesquisa ? 
          <div className="w-full flex flex-col items-center mb-20">
          <h1 className="text-2xl sm:text-3xl font-bold my-5">
            <span className="text-content5">Últimas </span> 
            Perguntas
          </h1>
          <CardPergunta filtro="limite" limite={5}/> 
        </div>

        :

        <div className="w-full flex flex-col items-center mb-20">
          <a className="flex items-center gap-2 mb-5 cursor-pointer hover:translate-x-[-10px] transition-transform" 
            onClick={() => definirIdParaPesquisa(null)}>
              <ArrowFatLineLeft size={24} color="#fdfcfc" weight="duotone" />
              <p>Voltar para as perguntas</p>
            </a>
          <CardPergunta filtro="pergunta" idPesquisa={idPesquisa}/> 
        </div>
        }

        <div className="w-full flex flex-col items-center mb-20">
          <h1 className="text-2xl sm:text-3xl font-bold my-5 text-content5">
            Temas
          </h1>
          <CardTema />
        </div>
      </>

      : 

      <>
        <div className="w-full flex flex-col items-center mb-20 gap-5">
          <div className="w-full flex flex-col items-center md:flex-row-reverse md:justify-between">
      
            <div className="hidden md:block w-40"></div>
            <h1 className="text-2xl sm:text-3xl font-bold my-5 text-content5">
              {temaPagina.toUpperCase()}
            </h1>
            <a className="flex items-center gap-2 md:ml-3 cursor-pointer hover:translate-x-[-10px] transition-transform" 
            onClick={() => definirTema('inicial')}>
              <ArrowFatLineLeft size={24} color="#fdfcfc" weight="duotone" />
              <p>Voltar aos temas</p>
            </a>
          </div>
          <CardPergunta filtro="tema" temaParaFiltro={temaPagina}/> 
          {alunoLogado && 
          
          <div className="px-2 w-full mt-10">
            <div className="bg-content2 w-full flex flex-col gap-10 bg-opacity-60 backdrop-blur-sm rounded-2xl px-2 sm:p-5 py-5 ">
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold md:border-l-8 md:pl-3">
                  <span className="text-content5 font-extrabold">NÃO ENCONTROU</span> UMA RESPOSTA PARA A SUA DÚVIDA?
                </h1>
                <p className="px-2 py-1 bg-content5 inline">
                  Então nos envie-a que iremos responder o mais rápido possível!
                </p>
              </div>
              <Textarea 
                label="Qual a sua dúvida?" 
                placeholder="Nos conte com detalhes, para que possamos entender e saná-la da melhor forma possível!"
                labelPlacement="outside"
                value={pergunta}
                onValueChange={definirPergunta}
              />

              {pergunta != '' && !loading ?
              <Button color="success" className="w-full md:w-min font-bold relative" onClick={() => pesquisar()}>
                Perguntar
              </Button>
              :
              <Button color="success" variant="ghost" isDisabled className="w-full md:w-min font-bold relative" onClick={() => pesquisar()}>
                Perguntar
              </Button>
              }

              {loading && 
                <Spinner color='success' className="md:absolute md:bottom-5 md:left-[50%] md:translate-x-[-50%]"/>
              }
            </div>
          </div>
          
          }
        </div>
      </>
    }

  </div>
  )
}

export default Home