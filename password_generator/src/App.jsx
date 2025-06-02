import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import PasswordGenerator from './components/PasswordGenerator'

function App() {
  return (
    <BrowserRouter basename="/web_projcts/password_generator">
      <Navbar /> 

      <Routes>
        <Route path="/Home" element={<Home title='Home' />}/>
        <Route path="/About" element={<PasswordGenerator title='PasswordGenerator' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
