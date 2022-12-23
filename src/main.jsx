import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { JournalApp } from './JournalApp'
import { store } from './store'
import './styles.css'
import 'animate.css';
import 'sweetalert2/dist/sweetalert2.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <JournalApp />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>,
)
