import { createContext, useEffect, useState } from "react"
import { useAuthApi } from "../../hooks/useAuthApi"
import PropTypes from 'prop-types'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

  const api = useAuthApi()
 
  const [usuario, definirUsuario] = useState(null)

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
          return userData
        } else {
          return null
        }
      } else {
        return null
      }
    
  }
 
  const entrar = async (email, senha) => {
    const userData = await api.entrar(email, senha)
    if(userData){
      definirUsuario(userData)
      armazenarToken(userData.token)
    }
  }

  const sair = () => {
    armazenarToken('')
    definirUsuario(null)
  }

  return (
    <AuthContext.Provider value={{usuario, entrar, sair, checarAutorizacao}}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node
}