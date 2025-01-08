// magang/frontend/src/App.jsx
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import FormPendaftaran from "./components/FormPendaftaran";
import ListRegistrasi from "./components/ListRegistrasi";
import Auth from "./components/Auth";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, profile, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return (
    <Router basename="/akademik/magang">
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Sistem Informasi Akademik - Magang</h1>
        <Auth />
        <nav className="mb-4">
          <Link to="/" className="mr-4 text-blue-600">Pendaftaran</Link>
          {user && profile?.role === "admin" && (
            <Link to="/registrasi" className="text-blue-600">Daftar Registrasi</Link>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<FormPendaftaran />} />
          <Route
            path="/registrasi"
            element={
              user && profile?.role === "admin" ? (
                <ListRegistrasi />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
