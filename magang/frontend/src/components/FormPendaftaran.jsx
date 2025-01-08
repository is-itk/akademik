// magang/frontend/src/components/FormPendaftaran.jsx
import React, { useState } from "react";
import { supabase } from "../lib/supabase";

const FormPendaftaran = () => {
  const [nama, setNama] = useState("");
  const [prodiCode, setProdiCode] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Pendaftaran user dengan email dan password
    const { user, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      console.error(signUpError);
      alert("Gagal mendaftar magang");
      setLoading(false);
      return;
    }

    // Update tabel profiles dengan informasi tambahan
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        nama,
        prodi_code: prodiCode,
        angkatan,
        role: "student", // Role default
      })
      .eq("id", user.id);

    if (updateError) {
      console.error(updateError);
      alert("Gagal mengisi profil");
      setLoading(false);
      return;
    }

    alert("Berhasil mendaftar magang. Silakan verifikasi email Anda.");
    // Reset form
    setNama("");
    setProdiCode("");
    setAngkatan("");
    setEmail("");
    setPassword("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Nama</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Prodi Code</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={prodiCode}
          onChange={(e) => setProdiCode(e.target.value)}
          required
          pattern="\d{2}" // Contoh: dua digit kode prodi
          title="Masukkan 2 digit kode prodi"
        />
      </div>
      <div>
        <label className="block mb-1">Angkatan</label>
        <input
          type="number"
          className="border p-2 w-full"
          value={angkatan}
          onChange={(e) => setAngkatan(parseInt(e.target.value))}
          required
          min="2000"
          max="2100"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Mendaftar..." : "Daftar"}
      </button>
    </form>
  );
};

export default FormPendaftaran;
