const Notifikasi = require('../models/Notifikasi');
require('dotenv').config();

const NotifikasiController = {
    async semua(req, res) {
        try {
            const user_id = req.user.id;
            const notifikasi = await Notifikasi.getByUser(user_id);
            return res.status(200).json({
                status: true,
                message: 'Berhasil mendapatkan semua notifikasi',
                data: notifikasi
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Gagal mendapatkan semua notifikasi',
                error: error.message
            });
        }
    },
    async tandai(req, res) {
        try {
            const get = req.params.id;
            const notifikasi = await Notifikasi.tandaiBaca(get);
            return res.status(200).json({
                status: true,
                message: 'Notifikasi ditandai sebagai dibaca',
                data : notifikasi
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Gagal menandai pesan',
                error: error.message
            })
        }
    }
}

module.exports = NotifikasiController;