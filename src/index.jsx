
import ReactDOM from 'react-dom/client'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'

import Main from './main.jsx'
import TemaProvider from './context/temaProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <TemaProvider>
        <Main/>
    </TemaProvider>
  </NextUIProvider>
)
