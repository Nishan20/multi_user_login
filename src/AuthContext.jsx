/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const USERS_KEY = 'multi_user_accounts'
const SESSION_KEY = 'multi_user_session'

const seedUsers = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date('2025-01-01').toISOString(),
  },
  {
    id: 'u2',
    name: 'Standard User',
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    createdAt: new Date('2025-01-05').toISOString(),
  },
]

const AuthContext = createContext(null)

const readUsers = () => {
  try {
    const savedUsers = localStorage.getItem(USERS_KEY)
    if (!savedUsers) {
      localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers))
      return seedUsers
    }

    const parsed = JSON.parse(savedUsers)
    return Array.isArray(parsed) ? parsed : seedUsers
  } catch {
    return seedUsers
  }
}

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => readUsers())
  const [user, setUser] = useState(() => {
    const storedUsers = readUsers()
    const sessionEmail = localStorage.getItem(SESSION_KEY)
    if (sessionEmail) {
      return storedUsers.find((u) => u.email === sessionEmail) || null
    }
    return null
  })
  const loading = false

  const login = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase()
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
    )

    if (!foundUser) {
      return { success: false, error: 'Invalid email or password' }
    }

    setUser(foundUser)
    localStorage.setItem(SESSION_KEY, foundUser.email)
    return { success: true }
  }

  const register = async (name, email, password, role = 'user') => {
    const normalizedEmail = email.trim().toLowerCase()

    if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      return { success: false, error: 'Email already exists' }
    }

    const newUser = {
      id: `u${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
      role,
      createdAt: new Date().toISOString(),
    }

    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    saveUsers(updatedUsers)
    setUser(newUser)
    localStorage.setItem(SESSION_KEY, newUser.email)

    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  const value = {
    users,
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: Boolean(user),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
