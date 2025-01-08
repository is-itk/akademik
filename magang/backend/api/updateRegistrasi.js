// magang/backend/api/updateRegistrasi.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Menggunakan service role key
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
  if (req.method === 'PUT') {
    const { id, nama, nim, prodi_code, angkatan, motivasi, rencana_kegiatan } = req.body;

    // Validasi input
    if (!id || !nama || !nim || !prodi_code || !angkatan || !motivasi || !rencana_kegiatan) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    if (!/^\d{8}$/.test(nim)) {
      return res.status(400).json({ error: "NIM harus terdiri dari 8 digit angka" });
    }

    // Memastikan hanya admin yang dapat mengupdate
    // Ini bisa dilakukan dengan memverifikasi token JWT pengguna
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { data: user, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Mendapatkan role pengguna
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.user.id)
      .single();

    if (profileError || profile.role !== 'admin') {
      return res.status(403).json({ error: "Forbidden" });
    }

    // Melakukan update
    const { data, error } = await supabase
      .from('magang_registrations')
      .update({ nama, nim, prodi_code, angkatan, motivasi, rencana_kegiatan })
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ data });
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
