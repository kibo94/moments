import { useState } from 'react'

export interface FeedPostData {
  id: string
  title: string
  body: string
  imgUrl: string
}

interface FeedPostProps {
  post: FeedPostData
  index: number
}

const authors = [
  { handle: 'jules.jpg', name: 'Jules Parker' },
  { handle: 'marco.ruiz', name: 'Marco Ruiz' },
  { handle: 'sana.k', name: 'Sana Kim' },
  { handle: 'oliver', name: 'Oliver Reed' },
]

function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={filled ? 'icon-filled' : undefined}>
      <path d="M20.8 8.8c0 4.5-8.8 10.1-8.8 10.1S3.2 13.3 3.2 8.8a4.5 4.5 0 0 1 8.8-1.3 4.5 4.5 0 0 1 8.8 1.3Z" />
    </svg>
  )
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.8 7.3L3 20l1.2-4.1a8.5 8.5 0 1 1 16.3-4.4Z" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m21 3-7.5 18-3.8-7.7L2 9.5 21 3Z" />
      <path d="M9.7 13.3 15 8" />
    </svg>
  )
}

function BookmarkIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={filled ? 'icon-filled' : undefined}>
      <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4V4.5Z" />
    </svg>
  )
}

export function FeedPost({ post, index }: FeedPostProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const author = authors[index % authors.length] ?? authors[0]!

  return (
    <article className="post-card">
      <header className="post-header">
        <span className={`post-avatar post-avatar-${index % 4}`}>
          {author.name.slice(0, 1)}
        </span>
        <div className="post-author">
          <strong>{author.handle}</strong>
          <span>{post.title}</span>
        </div>
        <button
          className="icon-button post-more"
          type="button"
          aria-label={`More options for ${author.handle}'s post`}
        >
          <span aria-hidden="true">•••</span>
        </button>
      </header>

      <img className="post-image" src={post.imgUrl} alt={post.title} loading="lazy" />

      <div className="post-actions">
        <div className="post-action-group">
          <button
            className={`icon-button${liked ? ' liked' : ''}`}
            type="button"
            aria-label={liked ? 'Unlike post' : 'Like post'}
            aria-pressed={liked}
            onClick={() => setLiked((current) => !current)}
          >
            <HeartIcon filled={liked} />
          </button>
          <button className="icon-button" type="button" aria-label="Comment on post">
            <CommentIcon />
          </button>
          <button className="icon-button" type="button" aria-label="Share post">
            <ShareIcon />
          </button>
        </div>
        <button
          className="icon-button"
          type="button"
          aria-label={saved ? 'Remove saved post' : 'Save post'}
          aria-pressed={saved}
          onClick={() => setSaved((current) => !current)}
        >
          <BookmarkIcon filled={saved} />
        </button>
      </div>

      <div className="post-copy">
        <strong>{(index + 1) * 128 + (liked ? 1 : 0)} likes</strong>
        <p><strong>{author.handle}</strong> {post.body}</p>
        <button className="comments-link" type="button">View all 18 comments</button>
        <span className="post-time">{index === 0 ? '2 HOURS AGO' : 'YESTERDAY'}</span>
      </div>
    </article>
  )
}
