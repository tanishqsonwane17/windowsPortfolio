import React from 'react'
import Home from './screens/Home'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router'
import FileExplorer from './screens/taskbar/FileExplorer'
const App = () => {
  return (
    <>
   
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/file-explorer' element={<FileExplorer/>}/>
      
    </Routes>
     <Footer/>
    </>
  )
}

export default App