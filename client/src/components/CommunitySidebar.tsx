interface CommunitySidebarProps {
  name?: string
  email?: string
}

const creators = [
  { handle: 'jules.jpg', initials: 'J' },
  { handle: 'sana.k', initials: 'S' },
  { handle: 'marco.ruiz', initials: 'M' },
]

export function CommunitySidebar({ name, email }: CommunitySidebarProps) {
  const displayName = name || email || 'you'
  const initial = displayName.slice(0, 1).toUpperCase()

  return (
    <aside className="feed-sidebar" aria-label="Community suggestions">
      <div className="current-user">
        <span className="profile-avatar">{initial}</span>
        <div>
          <strong>{email?.split('@')[0] ?? 'you'}</strong>
          <span>{name || 'Welcome to Moments'}</span>
        </div>
        <span className="you-label">YOU</span>
      </div>
      <div className="suggestion-heading">
        <span>People to discover</span>
        <button type="button">See all</button>
      </div>
      <div className="suggestion-list">
        {creators.map((creator, index) => (
          <div className="suggestion" key={creator.handle}>
            <span className={`post-avatar post-avatar-${index}`}>{creator.initials}</span>
            <div>
              <strong>{creator.handle}</strong>
              <span>Suggested for you</span>
            </div>
            <button type="button" aria-label={`Follow ${creator.handle}`}>Follow</button>
          </div>
        ))}
      </div>
      <p className="sidebar-note">A little inspiration from your corner of the internet.</p>
    </aside>
  )
}
