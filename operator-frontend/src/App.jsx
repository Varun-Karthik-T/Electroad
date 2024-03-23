import { useState } from 'react'
import {Button} from "@/components/ui/button"
import  Home from "./pages/Home"
import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
    
            <Route path="/" element={<Home/>}/>
         
        </Routes>
      </Router>
    </>
  )
}

export default App
