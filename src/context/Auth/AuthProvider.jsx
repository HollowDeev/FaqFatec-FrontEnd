import { createContext, useEffect, useState } from "react"
import { useAuthApi } from "../../hooks/useAuthApi"
import PropTypes from 'prop-types'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

  const api = useAuthApi()
 
  const [usuario, definirUsuario] = useState(null)
  const [parametrosRequisicao, definirParametrosRequisicao] = useState({})

  const armazenarToken = (token) => {
    localStorage.setItem("token", token)
  }

  useEffect(()  => {
    const validarToken = async () => {
      const userData = await checarAutorizacao()
      definirUsuario(userData)
    }

    validarToken()
  }, [])

  const checarAutorizacao = async () => {
      const tokenSalvo = localStorage.getItem("token")

      if(tokenSalvo){
        const userData = await api.validarToken(tokenSalvo)

        if(userData){
          definirParametros(userData.level, tokenSalvo, userData.id)
          return userData
        } else {
          return null
        }
      } else {
        return null
      }
    
  }

  const definirParametros = (level, token, id) => {
    const parametros = {
      baseURL: `http://127.0.0.1:8000/api/l${level}`,
      headers: {
        "Authorization": `Bearer ${token}`
      },
      user_id: id
    }

    definirParametrosRequisicao(parametros)
  }
 
  const entrar = async (email, senha) => {
    const userData = await api.entrar(email, senha)
    if(userData){
      definirUsuario(userData)
      armazenarToken(userData.token)
      definirParametros(userData.level, userData.token, userData.id)
    }
  }

  const sair = () => {
    armazenarToken('')
    definirUsuario(null)
  }

  return (
    <AuthContext.Provider value={{usuario, entrar, sair, checarAutorizacao, parametrosRequisicao}}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node
}