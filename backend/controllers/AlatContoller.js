const Alat = require('../models/Alat');
const Notifikasi = require('../models/Notifikasi');
require('dotenv').config();

const AlatController = {
    async getAll(req, res) {
        try {
            const alat = await Alat.getAll();
            res.status(200).json({
                message: "Data alat berhasil diambil",
                data: alat
            });
        } catch (error) {
            res.status(500).json({
                message: "Gagal mengambil data alat",
            });
        }
    },
    async getById(req, res) {
        const id = req.params.id;
        try {
            const alat = await Alat.getById(id);
            if (!alat) {
                return res.status(404).json({
                    message: "Data alat tidak ditemukan"
                });
            }
            res.status(200).json({
                message: "Data alat berhasil diambil",
                data: alat
            });
        } catch (error) {
            res.status(500).json({
                message: "Gagal mengambil data alat",
            });
        }
    },
    async create(req, res) {
        const { nama, jenis, stok, keterangan } = req.body;
        try {
            const result = await Alat.create({ nama, jenis, stok, keterangan });
            // const users = await Notifikasi.getAllUsersIds();
            // console.log("user ids:", users);
            // const pesan = `Alat baru telah ditambahkan: ${nama}`;
            // for (const user of users) {
            //     console.log("insert notif for:", user.id);
            //     await Notifikasi.create(user.id, pesan);
            // }
            res.status(201).json({
                message: "Data alat berhasil ditambahkan",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                message: "Gagal menambahkan data alat",
            });
        }
    },
    async update(req, res) {
        const id = req.params.id;
        const { nama, jenis, stok, keterangan } = req.body;
        try {
            const alat = await Alat.getById(id);
            if (!alat) {
                return res.status(404).json({
                    message: "Data alat tidak ditemukan"
                });
            }
            const result = await Alat.update(id, { nama, jenis, stok, keterangan });
            res.status(200).json({
                message: "Data alat berhasil diperbarui",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                message: "Gagal memperbarui data alat",
            });
        }
    },
    async delete(req, res) {
        const id = req.params.id;
        try {
            const alat = await Alat.delete(id);
            if (!alat) {
                return res.status(404).json({
                    message: "Data alat tidak ditemukan"
                });
            }
            await Alat.delete(id);
            res.status(200).json({
                message: "Data alat berhasil dihapus"
            });
        } catch (error) {
            res.status(500).json({
                message: "Gagal menghapus data alat",
            });
        }
    }
}

module.exports = AlatController;