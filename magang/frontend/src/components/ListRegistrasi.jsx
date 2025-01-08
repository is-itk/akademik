// magang/frontend/src/components/ListRegistrasi.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const ListRegistrasi = () => {
  const [registrasi, setRegistrasi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrasi();
  }, []);

  const fetchRegistrasi = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("magang_registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("Gagal mengambil data registrasi");
    } else {
      setRegistrasi(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from("magang_registrations")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Gagal menghapus registrasi");
    } else {
      alert("Berhasil menghapus registrasi");
      fetchRegistrasi();
    }
  };

  // Implementasi Update dapat dilakukan dengan membuat form terpisah atau modal

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Daftar Pendaftar Magang</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Nama</th>
            <th className="py-2">NIM</th>
            <th className="py-2">Angkatan</th>
            <th className="py-2">Motivasi</th>
            <th className="py-2">Rencana Kegiatan</th>
            <th className="py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {registrasi.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.nama}</td>
              <td className="border px-4 py-2">{item.nim}</td>
              <td className="border px-4 py-2">{item.angkatan}</td>
              <td className="border px-4 py-2">{item.motivasi}</td>
              <td className="border px-4 py-2">{item.rencana_kegiatan}</td>
              <td className="border px-4 py-2">
                {/* Tombol Delete */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
                {/* Implementasikan tombol Update sesuai kebutuhan */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListRegistrasi;
