
import ReactDOM from 'react-dom/client'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'

import Main from './main.jsx'
import TemaProvider from './context/TemaProvider'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/Auth/AuthProvider'
import  GerenciadorProvider  from './context/Gerenciador/gerenciadorProvider'
import PaginaHomeProvider from './context/PaginaHome/PaginaHomeProvider'
import DataProvider from './context/Data/dataProvider.jsx'
import PesquisaProvider from './context/Pesquisa/PesquisaProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <DataProvider>
      <PesquisaProvider>
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
      </PesquisaProvider>
    </DataProvider>
  </AuthProvider>
)
