import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onOfflineReady() {},
})

registerSW({ immediate: true })

updateSW()
ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
  </BrowserRouter>
  )
