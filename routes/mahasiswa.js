const express = require('express');
const router = express.Router();

// Data mahasiswa (in-memory storage)
let mahasiswa = [
  {
    id: 1,
    nama: 'Budi Santoso',
    alamat: 'Jl. Merdeka No. 10, Jakarta',
    ipk: 3.75,
    semester: 5,
    hobi: 'Membaca',
  },
  {
    id: 2,
    nama: 'Siti Nurhaliza',
    alamat: 'Jl. Sudirman No. 25, Bandung',
    ipk: 3.9,
    semester: 3,
    hobi: 'Menulis',
  },
  {
    id: 3,
    nama: 'Ahmad Dahlan',
    alamat: 'Jl. Diponegoro No. 5, Yogyakarta',
    ipk: 3.5,
    semester: 7,
    hobi: 'Bermain Futsal',
  },
];

// Auto-increment ID
let nextId = 4;

// ============================================
// GET - Mendapatkan semua data mahasiswa
// ============================================
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Berhasil mendapatkan semua data mahasiswa',
    data: mahasiswa,
  });
});

// ============================================
// GET - Mendapatkan data mahasiswa berdasarkan ID
// ============================================
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const mhs = mahasiswa.find((m) => m.id === id);

  if (!mhs) {
    return res.status(404).json({
      success: false,
      message: `Mahasiswa dengan ID ${id} tidak ditemukan`,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Berhasil mendapatkan data mahasiswa',
    data: mhs,
  });
});

// ============================================
// POST - Menambahkan data mahasiswa baru
// ============================================
router.post('/', (req, res) => {
  const { nama, alamat, ipk, semester, hobi } = req.body;

  // Validasi input
  if (!nama || !alamat || ipk === undefined || !semester || !hobi) {
    return res.status(400).json({
      success: false,
      message: 'Semua field (nama, alamat, ipk, semester, hobi) harus diisi',
    });
  }

  const newMahasiswa = {
    id: nextId++,
    nama,
    alamat,
    ipk: parseFloat(ipk),
    semester: parseInt(semester),
    hobi,
  };

  mahasiswa.push(newMahasiswa);

  res.status(201).json({
    success: true,
    message: 'Berhasil menambahkan data mahasiswa',
    data: newMahasiswa,
  });
});

// ============================================
// PUT - Mengupdate data mahasiswa berdasarkan ID
// ============================================
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = mahasiswa.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Mahasiswa dengan ID ${id} tidak ditemukan`,
    });
  }

  const { nama, alamat, ipk, semester, hobi } = req.body;

  // Validasi input
  if (!nama || !alamat || ipk === undefined || !semester || !hobi) {
    return res.status(400).json({
      success: false,
      message: 'Semua field (nama, alamat, ipk, semester, hobi) harus diisi',
    });
  }

  mahasiswa[index] = {
    id,
    nama,
    alamat,
    ipk: parseFloat(ipk),
    semester: parseInt(semester),
    hobi,
  };

  res.status(200).json({
    success: true,
    message: 'Berhasil mengupdate data mahasiswa',
    data: mahasiswa[index],
  });
});

// ============================================
// DELETE - Menghapus data mahasiswa berdasarkan ID
// ============================================
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = mahasiswa.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Mahasiswa dengan ID ${id} tidak ditemukan`,
    });
  }

  const deleted = mahasiswa.splice(index, 1);

  res.status(200).json({
    success: true,
    message: 'Berhasil menghapus data mahasiswa',
    data: deleted[0],
  });
});

module.exports = router;
