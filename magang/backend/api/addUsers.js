// magang/backend/scripts/addUsers.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Contoh data pengguna
const users = [
  {
    email: '10241001@student.itk.ac.id',
    password: 'securePassword1',
    nama: 'Mahasiswa 1',
    prodi_code: '10',
    angkatan: 2024,
    role: 'student',
  },
  {
    email: 'aidil@lecturer.itk.ac.id',
    password: 'securePassword2',
    nama: 'Dosen Aidil',
    prodi_code: '',
    angkatan: 0,
    role: 'dosen',
  },
  {
    email: 'aidil@staff.itk.ac.id',
    password: 'securePassword3',
    nama: 'Staff Aidil',
    prodi_code: '',
    angkatan: 0,
    role: 'tendik',
  },
  // Tambahkan pengguna lainnya sesuai kebutuhan
];

const addUsers = async () => {
  for (const user of users) {
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true, // Atur ke true jika Anda ingin mengonfirmasi email secara otomatis
    });

    if (authError) {
      console.error(`Error creating user ${user.email}:`, authError);
      continue;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authUser.id,
          nama: user.nama,
          prodi_code: user.prodi_code,
          angkatan: user.angkatan,
          role: user.role,
        },
      ]);

    if (profileError) {
      console.error(`Error inserting profile for ${user.email}:`, profileError);
    } else {
      console.log(`Successfully added user ${user.email}`);
    }
  }
};

addUsers();
