import { useAuth } from './AuthContext'
import './Dashboard.css'

const Dashboard = () => {
  const { user, users, logout } = useAuth()

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h1 className="dashboard-logo">Multi User System</h1>
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </nav>

      <main className="dashboard-main">
        <div className="welcome-card">
          <h2>Welcome, {user?.name}</h2>
          <p className="user-email">{user?.email}</p>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>Role</h3>
              <p className="stat-value role-tag">{user?.role}</p>
            </div>
            <div className="stat-card">
              <h3>Member Since</h3>
              <p className="stat-value">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : 'Unknown'}
              </p>
            </div>
            <div className="stat-card">
              <h3>Total Users</h3>
              <p className="stat-value">{users.length}</p>
            </div>
          </div>

          <div className="dashboard-content">
            <h3>Registered Users</h3>
            <ul className="user-list">
              {users.map((account) => (
                <li key={account.id}>
                  <span>{account.name}</span>
                  <span>{account.email}</span>
                  <span className="role-tag">{account.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
