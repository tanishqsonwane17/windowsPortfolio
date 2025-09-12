import React from 'react'
import Home from './screens/Home'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router'
import FileExplorer from './screens/taskbar/FileExplorer'
import ProjectsFolder from './screens/ProjectsFolder'
const App = () => {
  return (
    <>
   
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/file-explorer' element={<FileExplorer/>}/>
      <Route path='/projects' element={<ProjectsFolder/>}/>
    </Routes>
     <Footer/>
    </>
  )
}

export default App