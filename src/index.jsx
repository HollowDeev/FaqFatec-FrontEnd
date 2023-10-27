
import ReactDOM from 'react-dom/client'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'

import Main from './main.jsx'
import TemaProvider from './context/TemaProvider'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/Auth/AuthProvider'
import  GerenciadorProvider  from './context/Gerenciador/gerenciadorProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <GerenciadorProvider>
      <BrowserRouter>
        <NextUIProvider>
          <TemaProvider>
            <Main/>
          </TemaProvider>
        </NextUIProvider>
      </BrowserRouter>
    </GerenciadorProvider>
  </AuthProvider>
)
