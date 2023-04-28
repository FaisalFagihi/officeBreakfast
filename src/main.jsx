import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
    <GoogleOAuthProvider clientId="727515938547-5knpt0voai55equqiu8okhaaoh2h26du.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>
  )
