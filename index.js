const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();
const PORT = 3000;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Mahasiswa',
      version: '1.0.0',
      description:
        'API untuk mengelola data mahasiswa - Tugas 1 Integrasi Sistem',
      contact: {
        name: 'Mahasiswa',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware untuk parsing JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Import routes
const mahasiswaRoutes = require('./routes/mahasiswa');

// Gunakan routes
app.use('/api/mahasiswa', mahasiswaRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'REST API Mahasiswa - Tugas 1 Integrasi Sistem',
    documentation: 'http://localhost:3000/api-docs',
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
  console.log(`Swagger UI tersedia di http://localhost:${PORT}/api-docs`);
});
