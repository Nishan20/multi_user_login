import { useState } from 'react'
import { useAuth } from './AuthContext'
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'
import Loader from './Loader'

function App() {
  const { isAuthenticated, loading } = useAuth()
  const [mode, setMode] = useState('login')

  if (loading) {
    return (
      <div className="screen-center">
        <Loader size="large" />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Dashboard />
  }

  return mode === 'login' ? (
    <Login onSwitchToRegister={() => setMode('register')} />
  ) : (
    <Register onSwitchToLogin={() => setMode('login')} />
  )
}

export default App
