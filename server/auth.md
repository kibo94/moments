# auth.md — React + Vite Auth

Build login, register, an empty dashboard and a profile page. React + Vite + TypeScript, `react-router-dom`, `axios`.

API: `http://localhost:3000` (set `VITE_API_URL` in `.env`)

## API

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/users` | no | register |
| POST | `/auth/login` | no | login (assumed, not in router) |
| GET | `/users/me` | yes | current user |

- Login body: `{ email, password }` → response `{ token, user }` (assumed)
- Register body: `{ email, password, name }`
- Protected requests send `Authorization: Bearer <token>`
- Keep paths in one file `src/api/auth.ts` so they are easy to change

## Pages

| Route | Access | Content |
|-------|--------|---------|
| `/login` | public | email + password form |
| `/register` | public | name, email, password form |
| `/dashboard` | protected | empty, just `<h1>Dashboard</h1>` |
| `/profile` | protected | shows user from `GET /users/me` (no password) |

## Rules

- Store the token in `localStorage` (`auth_token`)
- `AuthContext` holds `user`, `login`, `register`, `logout`
- On app load, if a token exists, call `/users/me` to restore the session
- Protected routes redirect to `/login` when logged out
- `/login` and `/register` redirect to `/dashboard` when logged in
- After register, go to `/login`
- After login, go to `/dashboard`
- On a 401 response, clear the token and go to `/login`
- Show API error messages in the forms
- Navbar with Dashboard, Profile and Logout links

## Structure

```
src/
  api/        client.ts (axios + token interceptor), auth.ts
  context/    AuthContext.tsx
  components/ ProtectedRoute.tsx, Layout.tsx
  pages/      Login.tsx, Register.tsx, Dashboard.tsx, Profile.tsx
  App.tsx
```

## Notes

- Backend needs CORS enabled for `http://localhost:5173`
