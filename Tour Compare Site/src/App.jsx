import React from 'react'
import Index from './pages/Index'
import { AuthProvider } from './context/AuthContext.jsx'
import { Route, Routes } from 'react-router-dom'
import Search from './pages/Search'
import Compare from './pages/Compare'
import Admin from './pages/Admin'
import Signup from './pages/Signup'
import Login from './pages/Login'
import NotFound from './pages/NotFound'  

const App = () => {
  
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<Search />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App