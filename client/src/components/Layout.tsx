import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3.5 10 8.5-7 8.5 7v10a1 1 0 0 1-1 1h-5.3v-7H9.8v7H4.5a1 1 0 0 1-1-1z" />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5" />
      <path d="M14 16l4-4-4-4m4 4H9" />
    </svg>
  )
}

export function Layout() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  const dashboardLink = (
    <NavLink className="side-link" to="/dashboard">
      <HomeIcon />
      <span>Home</span>
    </NavLink>
  )
  const profileLink = (
    <NavLink className="side-link" to="/profile">
      <ProfileIcon />
      <span>Profile</span>
    </NavLink>
  )
  const logoutButton = (
    <button className="side-link side-logout" type="button" onClick={handleLogout}>
      <LogoutIcon />
      <span>Log out</span>
    </button>
  )

  return (
    <div className="site-shell">
      <header className="topbar">
        <NavLink className="brand" to="/dashboard" aria-label="Moments home">
          <span className="brand-mark" aria-hidden="true">m</span>
          <span>moments</span>
        </NavLink>
        <label className="search-box">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <input type="search" placeholder="Search" aria-label="Search" />
        </label>
        <NavLink className="topbar-avatar" to="/profile" aria-label="Open your profile">
          {(user?.name || user?.email || 'Y').slice(0, 1).toUpperCase()}
        </NavLink>
      </header>

      <div className="app-frame">
        <aside className="side-nav" aria-label="Main navigation">
          <nav className="side-nav-links">
            {dashboardLink}
            {profileLink}
          </nav>
          {logoutButton}
        </aside>

        <main className="content">
          <Outlet />
        </main>
      </div>

      <nav className="mobile-nav" aria-label="Main navigation">
        {dashboardLink}
        {profileLink}
        {logoutButton}
      </nav>
    </div>
  )
}
