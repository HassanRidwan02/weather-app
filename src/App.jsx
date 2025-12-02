import { useState } from 'react'
import './App.css'

import Navbar from './Navbar'
import Searchbar from './Searchbar'

function App() {

  return (
    <div className="container">
      <Navbar />
      <Searchbar />
    </div>
  )
}

export default App
