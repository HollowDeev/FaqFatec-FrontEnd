import { createContext, useEffect, useState } from "react"
import { useAuthApi } from "../../hooks/useAuthApi"
import PropTypes from 'prop-types'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

  const api = useAuthApi()
 
  const [usuario, definirUsuario] = useState(null)
  const [parametrosRequisicao, definirParametrosRequisicao] = useState(null)
  const [perguntasAtualizadas, definirPerguntasAtualizadas] = useState([])

  const armazenarToken = (token) => {
    localStorage.setItem("token", token)
  }

  useEffect(()  => {
    const validarToken = async () => {
      const data = await checarAutorizacao()
      definirUsuario(data.usuario)
      definirPerguntasAtualizadas(data.pergunta)
    }

    validarToken()
  }, [])

  const removerUmaPerguntaAtualizada = (id) => {
    definirPerguntasAtualizadas((prev) => prev.filter((pergunta) => pergunta.id != id))
  }

  const checarAutorizacao = async () => {
      const tokenSalvo = localStorage.getItem("token")

      if(tokenSalvo){
        const data = await api.validarToken(tokenSalvo)

        if(data){
          definirParametros(data.usuario.level, tokenSalvo, data.usuario.id)
          return data
        } else {
          return null
        }
      } else {
        return null
      }
    
  }

  const definirParametros =  (level, token, id) => {
    const parametros = {
      baseURL: `http://127.0.0.1:8000/api/l${level}`,
      headers: {
        "Authorization": `Bearer ${token}`
      },
      user_id: id,
      level: level
    }

    definirParametrosRequisicao(parametros)
  }
 
  const entrar = async (email, senha) => {
    const data = await api.entrar(email, senha)
    if(data){

      definirUsuario(data.usuario)
      armazenarToken(data.usuario.token)
      definirParametros(data.usuario.level, data.usuario.token, data.usuario.id)
      definirPerguntasAtualizadas(data.pergunta)
    }
  }

  const sair = () => {
    armazenarToken('')
    definirUsuario(null)
    definirParametrosRequisicao(null)
  }

  return (
    <AuthContext.Provider value={{usuario, entrar, sair, checarAutorizacao, parametrosRequisicao, perguntasAtualizadas, removerUmaPerguntaAtualizada}}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node
}