import { useState } from 'react'
import { useAuth } from './AuthContext'
import Loader from './Loader'
import './Auth.css'

const Login = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const result = await login(formData.email, formData.password)

    if (!result.success) {
      setError(result.error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Multi User Login</h2>
        <p className="auth-subtitle">Login with any registered account</p>

        <div className="demo-accounts">
          <p>Demo accounts:</p>
          <span>admin@example.com / admin123</span>
          <span>user@example.com / user123</span>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="button-content">
                <Loader size="small" />
                <span>Logging in...</span>
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don&apos;t have an account?{' '}
            <button type="button" className="text-link" onClick={onSwitchToRegister}>
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
