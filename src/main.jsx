import React from 'react'
import ReactDOM from 'react-dom/client'
import AnimalTalkr from './AnimalTalkr.jsx' // Changed from App.jsx
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AnimalTalkr />
  </React.StrictMode>,
)