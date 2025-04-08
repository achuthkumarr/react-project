import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLINT_ID = "1099322664257-2b7bd5538nur8ovtqf9fl43dl4t43st2.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={CLINT_ID}>
    <App />
    </GoogleOAuthProvider>
  </Provider>,
)
