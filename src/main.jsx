import React from 'react'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import './index.css'
import '/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import AppCountextProvider from './context/AppContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter> 
  <AppCountextProvider>
  <App />
  </AppCountextProvider>
   </BrowserRouter>
  </React.StrictMode>,
)
