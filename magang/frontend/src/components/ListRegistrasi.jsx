// magang/frontend/src/components/ListRegistrasi.jsx
import React, { useState, useEffect, useContext } from "react";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../context/AuthContext";

const ListRegistrasi = () => {
  const { user, profile } = useContext(AuthContext);
  const [registrasi, setRegistrasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    nama: "",
    nim: "",
    prodi_code: "",
    angkatan: 0,
    motivasi: "",
    rencana_kegiatan: "",
  });

  useEffect(() => {
    if (profile?.role === "admin") {
      fetchRegistrasi();
    }
  }, [profile]);

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

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData({
      nama: item.nama,
      nim: item.nim,
      prodi_code: item.prodi_code,
      angkatan: item.angkatan,
      motivasi: item.motivasi,
      rencana_kegiatan: item.rencana_kegiatan,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("magang_registrations")
      .update({
        nama: editData.nama,
        nim: editData.nim,
        prodi_code: editData.prodi_code,
        angkatan: editData.angkatan,
        motivasi: editData.motivasi,
        rencana_kegiatan: editData.rencana_kegiatan,
      })
      .eq("id", editingId);

    if (error) {
      console.error(error);
      alert("Gagal memperbarui registrasi");
    } else {
      alert("Berhasil memperbarui registrasi");
      setEditingId(null);
      setEditData({
        nama: "",
        nim: "",
        prodi_code: "",
        angkatan: 0,
        motivasi: "",
        rencana_kegiatan: "",
      });
      fetchRegistrasi();
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Daftar Pendaftar Magang</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Nama</th>
            <th className="py-2">NIM</th>
            <th className="py-2">Prodi Code</th>
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
              <td className="border px-4 py-2">{item.prodi_code}</td>
              <td className="border px-4 py-2">{item.angkatan}</td>
              <td className="border px-4 py-2">{item.motivasi}</td>
              <td className="border px-4 py-2">{item.rencana_kegiatan}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-green-600 text-white px-2 py-1 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingId && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Edit Registrasi</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block mb-1">Nama</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={editData.nama}
                onChange={(e) => setEditData({ ...editData, nama: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1">NIM</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={editData.nim}
                onChange={(e) => setEditData({ ...editData, nim: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1">Prodi Code</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={editData.prodi_code}
                onChange={(e) => setEditData({ ...editData, prodi_code: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1">Angkatan</label>
              <input
                type="number"
                className="border p-2 w-full"
                value={editData.angkatan}
                onChange={(e) => setEditData({ ...editData, angkatan: parseInt(e.target.value) })}
                required
                min="2000"
                max="2100"
              />
            </div>
            <div>
              <label className="block mb-1">Motivasi</label>
              <textarea
                className="border p-2 w-full"
                value={editData.motivasi}
                onChange={(e) => setEditData({ ...editData, motivasi: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1">Rencana Kegiatan</label>
              <textarea
                className="border p-2 w-full"
                value={editData.rencana_kegiatan}
                onChange={(e) => setEditData({ ...editData, rencana_kegiatan: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Perbarui
            </button>
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="bg-gray-600 text-white px-4 py-2 rounded ml-2"
            >
              Batal
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ListRegistrasi;
