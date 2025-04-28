import React from 'react'
import Login from './Pages/Auth/Login'
import Header from './Common/Header'
import { Route } from 'lucide-react'

const App = () => {
  return (
    <div>
        <Header />
        <Login />
    </div>
  )
}

export default App