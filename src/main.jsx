import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import '@ant-design/v5-patch-for-react-19';
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
