// magang/frontend/src/components/FormPendaftaran.jsx
import React, { useState } from "react";
import { supabase } from "../lib/supabase";

const FormPendaftaran = () => {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [motivasi, setMotivasi] = useState("");
  const [rencana, setRencana] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from("magang_registrations")
      .insert([
        {
          nama,
          nim,
          angkatan,
          motivasi,
          rencana_kegiatan: rencana,
        },
      ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Gagal mendaftar magang");
    } else {
      alert("Berhasil mendaftar magang");
      // Reset form
      setNama("");
      setNim("");
      setAngkatan("");
      setMotivasi("");
      setRencana("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <label className="block mb-1">NIM</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={nim}
          onChange={(e) => setNim(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Angkatan</label>
        <select
          className="border p-2 w-full"
          value={angkatan}
          onChange={(e) => setAngkatan(e.target.value)}
          required
        >
          <option value="">Pilih Angkatan</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
        </select>
      </div>
      <div>
        <label className="block mb-1">Motivasi</label>
        <textarea
          className="border p-2 w-full"
          value={motivasi}
          onChange={(e) => setMotivasi(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Rencana Kegiatan</label>
        <textarea
          className="border p-2 w-full"
          value={rencana}
          onChange={(e) => setRencana(e.target.value)}
          required
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
