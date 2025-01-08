// magang/frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FormPendaftaran from "./components/FormPendaftaran";
import ListRegistrasi from "./components/ListRegistrasi";

function App() {
  return (
    <Router basename="/akademik/magang">
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Sistem Informasi Akademik - Magang</h1>
        <nav className="mb-4">
          <Link to="/" className="mr-4 text-blue-600">Pendaftaran</Link>
          <Link to="/registrasi" className="text-blue-600">Daftar Registrasi</Link>
        </nav>
        <Routes>
          <Route path="/" element={<FormPendaftaran />} />
          <Route path="/registrasi" element={<ListRegistrasi />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
