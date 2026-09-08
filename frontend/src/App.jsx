import { Routes, Route } from "react-router-dom"
import Land from "./pages/Land.jsx"
import CreateNote from "./pages/CreateNote.jsx"
import Notes from "./pages/Notes.jsx"
import Login from "./pages/Login.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"


function App() {


  return (

    
    <Routes>

      <Route path = '/' element={<Land/>} />
      <Route path = '/login' element={<Login/>} />


      <Route path = '/create' element={
        <ProtectedRoute>
          <CreateNote/>
        </ProtectedRoute>
        } />


      <Route path = '/notes' element={
        <ProtectedRoute>
          <Notes/>
        </ProtectedRoute>
        } />
      
    </Routes>
  )
}

export default App
