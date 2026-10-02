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

/**
 * @swagger
 * components:
 *   schemas:
 *     Mahasiswa:
 *       type: object
 *       required:
 *         - nama
 *         - alamat
 *         - ipk
 *         - semester
 *         - hobi
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generated
 *           example: 1
 *         nama:
 *           type: string
 *           description: Nama lengkap mahasiswa
 *           example: Budi Santoso
 *         alamat:
 *           type: string
 *           description: Alamat mahasiswa
 *           example: Jl. Merdeka No. 10, Jakarta
 *         ipk:
 *           type: number
 *           format: float
 *           description: Indeks Prestasi Kumulatif
 *           example: 3.75
 *         semester:
 *           type: integer
 *           description: Semester saat ini
 *           example: 5
 *         hobi:
 *           type: string
 *           description: Hobi mahasiswa
 *           example: Membaca
 *     MahasiswaInput:
 *       type: object
 *       required:
 *         - nama
 *         - alamat
 *         - ipk
 *         - semester
 *         - hobi
 *       properties:
 *         nama:
 *           type: string
 *           description: Nama lengkap mahasiswa
 *           example: Budi Santoso
 *         alamat:
 *           type: string
 *           description: Alamat mahasiswa
 *           example: Jl. Merdeka No. 10, Jakarta
 *         ipk:
 *           type: number
 *           format: float
 *           description: Indeks Prestasi Kumulatif
 *           example: 3.75
 *         semester:
 *           type: integer
 *           description: Semester saat ini
 *           example: 5
 *         hobi:
 *           type: string
 *           description: Hobi mahasiswa
 *           example: Membaca
 */

/**
 * @swagger
 * /api/mahasiswa:
 *   get:
 *     summary: Mendapatkan semua data mahasiswa
 *     tags: [Mahasiswa]
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan semua data mahasiswa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Berhasil mendapatkan semua data mahasiswa
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Mahasiswa'
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Berhasil mendapatkan semua data mahasiswa',
    data: mahasiswa,
  });
});

/**
 * @swagger
 * /api/mahasiswa/{id}:
 *   get:
 *     summary: Mendapatkan data mahasiswa berdasarkan ID
 *     tags: [Mahasiswa]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID mahasiswa
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan data mahasiswa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Berhasil mendapatkan data mahasiswa
 *                 data:
 *                   $ref: '#/components/schemas/Mahasiswa'
 *       404:
 *         description: Mahasiswa tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Mahasiswa dengan ID 999 tidak ditemukan
 */
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

/**
 * @swagger
 * /api/mahasiswa:
 *   post:
 *     summary: Menambahkan data mahasiswa baru
 *     tags: [Mahasiswa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MahasiswaInput'
 *     responses:
 *       201:
 *         description: Berhasil menambahkan data mahasiswa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Berhasil menambahkan data mahasiswa
 *                 data:
 *                   $ref: '#/components/schemas/Mahasiswa'
 *       400:
 *         description: Validasi gagal - field tidak lengkap
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Semua field (nama, alamat, ipk, semester, hobi) harus diisi
 */
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

/**
 * @swagger
 * /api/mahasiswa/{id}:
 *   put:
 *     summary: Mengupdate data mahasiswa berdasarkan ID
 *     tags: [Mahasiswa]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID mahasiswa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MahasiswaInput'
 *     responses:
 *       200:
 *         description: Berhasil mengupdate data mahasiswa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Berhasil mengupdate data mahasiswa
 *                 data:
 *                   $ref: '#/components/schemas/Mahasiswa'
 *       404:
 *         description: Mahasiswa tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Mahasiswa dengan ID 999 tidak ditemukan
 *       400:
 *         description: Validasi gagal - field tidak lengkap
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Semua field (nama, alamat, ipk, semester, hobi) harus diisi
 */
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

/**
 * @swagger
 * /api/mahasiswa/{id}:
 *   delete:
 *     summary: Menghapus data mahasiswa berdasarkan ID
 *     tags: [Mahasiswa]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID mahasiswa
 *     responses:
 *       200:
 *         description: Berhasil menghapus data mahasiswa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Berhasil menghapus data mahasiswa
 *                 data:
 *                   $ref: '#/components/schemas/Mahasiswa'
 *       404:
 *         description: Mahasiswa tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Mahasiswa dengan ID 999 tidak ditemukan
 */
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
