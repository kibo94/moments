// Runtime validation coverage for the app's router and auth entry flow.
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('./api/client', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [] }),
  },
}))

import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthContext } from './context/authContext'
import type { AuthUser } from './api/auth'

const roots: Root[] = []

function renderApp(path: string, user: AuthUser | null) {
  const container = document.createElement('div')
  document.body.append(container)
  window.history.replaceState({}, '', path)

  const root = createRoot(container)
  roots.push(root)
  act(() => {
    root.render(
      <AuthContext.Provider
        value={{
          user,
          loading: false,
          sessionError: null,
          login: async () => {},
          register: async () => {},
          logout: () => {},
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContext.Provider>,
    )
  })

  return container
}

describe('app routing', () => {
  beforeEach(() => {
    vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  })

  afterEach(() => {
    act(() => {
      roots.splice(0).forEach((root) => root.unmount())
    })
    document.body.replaceChildren()
    vi.unstubAllGlobals()
  })

  it('renders the login page for a logged-out visitor at the root', () => {
    const container = renderApp('/', null)

    expect(container.textContent).toContain('Welcome back')
    expect(window.location.pathname).toBe('/login')
  })

  it('renders the protected dashboard and supports navigation from the layout', () => {
    const container = renderApp('/dashboard', {
      id: 'user-1',
      name: 'Test User',
      email: 'test@example.com',
    })

    expect(container.textContent).toContain('Latest moments')
    expect(container.textContent).toContain('Profile')
    expect(container.textContent).toContain('Log out')
  })
})
