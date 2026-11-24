import api from './client'

export interface AuthUser {
  id: string
  name?: string
  email: string
}

interface LoginResponse {
  token: string
  user: AuthUser
}

const authPaths = {
  register: '/users',
  login: '/auth/login',
  me: '/users/me',
} as const

export async function registerUser(input: {
  name: string
  email: string
  password: string
}): Promise<void> {
  await api.post(authPaths.register, input)
}

export async function loginUser(input: {
  email: string
  password: string
}): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(authPaths.login, input)
  return response.data
}

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await api.get<AuthUser>(authPaths.me)
  return response.data
}
