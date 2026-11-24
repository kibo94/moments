import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import { Layout } from "./components/Layout";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Register } from "./pages/Register";
import "./App.css";

function HomeRedirect() {
  const { user, loading } = useAuth();

  if (loading) {
    return <main className="page-loading">Loading your account...</main>;
  }

  return <Navigate to={user ? "/dashboard" : "/login"} replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  );
}

export default App;
