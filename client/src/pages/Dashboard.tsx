import { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../api/client'
import { CommunitySidebar } from '../components/CommunitySidebar'
import { FeedPost, type FeedPostData } from '../components/FeedPost'
import { Story, type StoryData } from '../components/Story'
import { useAuth } from '../context/useAuth'

const stories: StoryData[] = [
  { name: 'Your story', initials: '+', own: true },
  { name: 'jules.jpg', initials: 'J' },
  { name: 'marco', initials: 'M' },
  { name: 'sana.k', initials: 'S' },
  { name: 'oliver', initials: 'O' },
  { name: 'nina.day', initials: 'N' },
  { name: 'theo', initials: 'T' },
]

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error) && typeof error.response?.data === 'string') {
    return error.response.data
  }
  return 'We could not load the feed. Please try again in a moment.'
}

export function Dashboard() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<FeedPostData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadPosts() {
      try {
        const response = await api.get<FeedPostData[]>('/feeds')
        if (active) setPosts(response.data)
      } catch (requestError: unknown) {
        if (active) setError(getErrorMessage(requestError))
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadPosts()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="feed-layout">
      <section className="feed-column" aria-label="Your social feed">
        <div className="stories-card">
          <div className="stories-list">
            {stories.map((story, index) => (
              <Story key={story.name} story={story} index={index} />
            ))}
          </div>
        </div>

        <div className="feed-heading">
          <div>
            <p className="eyebrow">YOUR COMMUNITY</p>
            <h1>Latest moments</h1>
          </div>
          <span className="feed-live">
            <span /> Fresh today
          </span>
        </div>

        {loading && <p className="feed-message">Finding the latest moments...</p>}
        {error && <p className="feed-message feed-error" role="alert">{error}</p>}
        {!loading && !error && posts.length === 0 && (
          <p className="feed-message">
            Nothing here yet. Check back soon for new moments.
          </p>
        )}

        <div className="post-list">
          {posts.map((post, index) => (
            <FeedPost key={post.id} post={post} index={index} />
          ))}
        </div>
      </section>

      <CommunitySidebar name={user?.name} email={user?.email} />
    </div>
  )
}
