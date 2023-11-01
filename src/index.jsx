
import ReactDOM from 'react-dom/client'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'

import Main from './main.jsx'
import TemaProvider from './context/TemaProvider'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/Auth/AuthProvider'
import  GerenciadorProvider  from './context/Gerenciador/gerenciadorProvider'
import PaginaHomeProvider from './context/PaginaHome/PaginaHomeProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <PaginaHomeProvider>
      <GerenciadorProvider>
        <BrowserRouter>
          <NextUIProvider>
            <TemaProvider>
              <Main/>
            </TemaProvider>
          </NextUIProvider>
        </BrowserRouter>
      </GerenciadorProvider>
    </PaginaHomeProvider>
  </AuthProvider>
)
