const express = require('express');
const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const mahasiswaRoutes = require('./routes/mahasiswa');

// Gunakan routes
app.use('/api/mahasiswa', mahasiswaRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'REST API Mahasiswa - Tugas 1 Integrasi Sistem',
    endpoints: {
      'GET /api/mahasiswa': 'Mendapatkan semua data mahasiswa',
      'GET /api/mahasiswa/:id': 'Mendapatkan data mahasiswa berdasarkan ID',
      'POST /api/mahasiswa': 'Menambahkan data mahasiswa baru',
      'PUT /api/mahasiswa/:id': 'Mengupdate data mahasiswa berdasarkan ID',
      'DELETE /api/mahasiswa/:id': 'Menghapus data mahasiswa berdasarkan ID',
    },
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
