import { useAuth } from '../context/useAuth'

export function Profile() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <section className="profile-page">
      <h1>Profile</h1>
      <section className="profile-card" aria-label="Your profile">
        <div className="profile-identity">
          <span className="profile-large-avatar" aria-hidden="true">
            {(user.name || user.email).slice(0, 1).toUpperCase()}
          </span>
          <strong>{user.name || 'Your profile'}</strong>
          <span>@{user.email.split('@')[0]}</span>
        </div>
        <div className="profile-details">
          <h2>Your account</h2>
          <p>Your profile details are only shown to you.</p>
          <div className="profile-row">
            <span className="profile-label">Name</span>
            <span className="profile-value">{user.name || 'Not provided'}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Email</span>
            <span className="profile-value">{user.email}</span>
          </div>
        </div>
      </section>
    </section>
  )
}
