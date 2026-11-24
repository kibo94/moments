export interface StoryData {
  name: string
  initials: string
  own?: boolean
}

interface StoryProps {
  story: StoryData
  index: number
}

export function Story({ story, index }: StoryProps) {
  const label = story.own ? 'Add to your story' : `View ${story.name}'s story`

  return (
    <button className="story" type="button" aria-label={label}>
      <span className={`story-ring story-ring-${index}`}>
        <span className={`story-avatar${story.own ? ' story-avatar-own' : ''}`}>
          {story.initials}
        </span>
      </span>
      <span className="story-name">{story.name}</span>
    </button>
  )
}
