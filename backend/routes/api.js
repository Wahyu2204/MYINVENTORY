const express = require('express');
const router = express.Router();
const { authMiddleware, authorize } = require('../middleware/authen');
const UserController = require('../controllers/UserContoller');
const AlatController = require('../controllers/AlatContoller');
const NotifikasiController = require('../controllers/NotifikasiController');
const PinjamanController = require('../controllers/PinjamanController');
const LaporanController = require('../controllers/LaporanController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', authMiddleware,UserController.profile);
router.post('/reset-password', UserController.resetPassword);

router.get('/alat', authMiddleware, AlatController.getAll);
router.get('/alat/:id', authMiddleware, AlatController.getById);
router.post('/alat', authMiddleware, authorize('admin'), AlatController.create);
router.put('/alat/:id', authMiddleware, authorize('admin'), AlatController.update);
router.delete('/alat/:id', authMiddleware, authorize('admin'), AlatController.delete);

router.post('/pinjam', authMiddleware, PinjamanController.pinjam);
router.get('/riwayat', authMiddleware, PinjamanController.riwayat);
router.get('/pinjaman', authMiddleware, authorize('admin'), PinjamanController.semua);
router.put('/pinjaman/:id/setujui', authMiddleware, authorize('admin'), PinjamanController.setujui);
router.put('/pinjaman/:id/tolak', authMiddleware, authorize('admin'), PinjamanController.tolak);
router.put('/pinjaman/:id/kembali', authMiddleware, PinjamanController.kembalikan);

router.get('/laporan-bulanan', authMiddleware, authorize('admin'), LaporanController.getMonthlyData);
router.get('/laporan-bulanan/cetak', authMiddleware, authorize('admin'), LaporanController.generateMonthlyPDF);

router.get('/notifikasi', authMiddleware, NotifikasiController.semua);
router.put('/notifikasi/:id/baca', authMiddleware, NotifikasiController.tandai);

module.exports = router;