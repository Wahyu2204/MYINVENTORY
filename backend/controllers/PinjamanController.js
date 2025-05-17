const Pinjaman = require('../models/Pinjaman');
const Notifikasi = require('../models/Notifikasi');
require ('dotenv').config();

const PinjamanController = {
    async pinjam (req, res) {
        try {
            const data = {
                user_id: req.user.id,
                alat_id: req.body.alat_id,
                tanggal_pinjam: new Date(),
                tanggal_kembali: req.body.tanggal_kembali
            }

            const pinjaman = await Pinjaman.create(data);

            try {
                const notif = await Notifikasi.create(
                     req.user.id,
                    `Permohonan pinjaman alat dengan ID ${data.alat_id} telah diajukan.`
                )

                const adminIds = await Notifikasi.getAdminIds();
                if (adminIds && adminIds.length > 0) {
                    adminIds.forEach(async (admin) => {
                      await Notifikasi.create(
                        admin.id,
                        `Ada permohonan pinjaman alat baru dengan ID ${data.alat_id}.`
                      );  
                    })
                    
                }
                console.log('Notifikasi berhasil dikirim', notif);
            } catch (error) {
                console.error('Gagal mengirim notifikasi:', error.message);
            }

            return res.status(201).json({
                status: true,
                message: 'Berhasil meminjam alat, tunggu persetujuan admin',
                data: pinjaman
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Terjadi kesalahan saat meminjam alat',
                error: error.message
            });
        }
    },
    async riwayat (req, res) {
        try {
            const user_id = req.user.id;
            const pinjaman = await Pinjaman.getByUser(user_id);
            return res.status(200).json({
                status: true,
                message: 'Berhasil mendapatkan riwayat pinjaman',
                data: pinjaman
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Terjadi kesalahan saat mendapatkan riwayat pinjaman',
                error: error.message
            });
        }
    },
    async semua (req, res) {
        try {
            const pinjaman = await Pinjaman.getAll();
            return res.status(200).json({
                status: true,
                message: 'Berhasil mendapatkan semua pinjaman',
                data: pinjaman
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Terjadi kesalahan saat mendapatkan semua pinjaman',
                error: error.message
            });
        }
    },
    async setujui (req, res) {
        try {
            const id = req.params.id;
            const status = 'disetujui';
            const pinjaman = await Pinjaman.updateStatus(id, status);

            try {
                const notif = await Notifikasi.create(
                    pinjaman.user_id,
                    `Permohonan pinjaman alat dengan ID ${pinjaman.alat_id} telah disetujui.`
                )
                console.log('Notifikasi berhasil dikirim', notif);
            } catch (error) {
                console.error('Gagal mengirim notifikasi:', error.message);
            }

            return res.status(200).json({
                status: true,
                message: 'Berhasil menyetujui pinjaman',
                data: pinjaman
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Terjadi kesalahan saat menyetujui pinjaman',
                error: error.message
            });
        }
    },
    async tolak (req, res) {
        try {
            const id = req.params.id;
            const status = 'ditolak';
            const pinjaman = await Pinjaman.updateStatus(id, status);

            try {
                const notif = await Notifikasi.create(
                    pinjaman.user_id,
                    `Permohonan pinjaman alat dengan ID ${pinjaman.alat_id} telah ditolak.`
                )
                console.log('Notifikasi berhasil dikirim', notif);
            } catch (error) {
                console.error('Gagal mengirim notifikasi:', error.message);
            }

            return res.status(200).json({
                status: true,
                message: 'Menolak pinjaman',
                data: pinjaman
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Terjadi kesalahan saat menolak pinjaman',
                error: error.message
            });
        }
    },
    async kembalikan (req, res) {
        try {
            const id = req.params.id;
            const status = 'dikembalikan';
            const pinjaman = await Pinjaman.updateStatus(id, status);

            try {
                const notif = await Notifikasi.create(
                    pinjaman.user_id,
                    `Pinjaman alat dengan ID ${pinjaman.alat_id} telah dikembalikan.`
                )
                console.log('Notifikasi berhasil dikirim', notif);
            } catch (error) {
                console.error('Gagal mengirim notifikasi:', error.message);
            }

            return res.status(200).json({
                status: true,
                message: 'Berhasil mengembalikan pinjaman',
                data: pinjaman
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Terjadi kesalahan saat mengembalikan pinjaman',
                error: error.message
            });
        }
    }
}

module.exports = PinjamanController;