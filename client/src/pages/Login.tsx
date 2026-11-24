import { useState, type FormEvent } from 'react'
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const responseMessage = error.response?.data
    if (typeof responseMessage === 'string') return responseMessage
    if (
      typeof responseMessage === 'object'
      && responseMessage !== null
      && 'message' in responseMessage
      && typeof responseMessage.message === 'string'
    ) {
      return responseMessage.message
    }
  }
  return 'Unable to sign in. Please try again.'
}

export function Login() {
  const { login, sessionError } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const registered = (location.state as { registered?: boolean } | null)?.registered
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
      navigate('/dashboard', { replace: true })
    } catch (requestError: unknown) {
      setError(getErrorMessage(requestError))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-intro">Sign in to continue to your account.</p>
        {registered && <p className="form-success" role="status">Account created. You can now sign in.</p>}
        {sessionError && <p className="form-error" role="alert">{sessionError}</p>}
        <form className="form-fields" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <button className="primary-button" type="submit" disabled={submitting}>
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        {error && <p className="form-error" role="alert">{error}</p>}
        <p className="auth-switch">
          Don&apos;t have an account? <Link to="/register">Create one</Link>
        </p>
      </section>
    </main>
  )
}
