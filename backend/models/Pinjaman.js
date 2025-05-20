const db = require('../config/database');

const Pinjaman = {
    async create(data) {
        await db.query('START TRANSACTION');

        try {
            const result = await db.query('INSERT INTO pinjaman SET ?', [data]);
            const pinjamanId = result.insertId;

            const updateResult = await db.query(
                'UPDATE alat SET stok = stok - 1 WHERE id = ? AND stok > 0',
                [data.alat_id]
            );
            if (updateResult.affectedRows === 0) {
                throw new Error('Stok alat tidak cukup');
            }

            await db.query('COMMIT');

            const rows = await db.query(
                `SELECT p.*, u.nama AS nama, a.nama AS nama_alat, a.stok AS stok_alat 
                FROM pinjaman p 
                JOIN users u ON p.user_id = u.id 
                JOIN alat a ON p.alat_id = a.id 
                WHERE p.id = ?`,
                [pinjamanId]
            );
            return rows[0];
        } catch (error) {
            await db.query('ROLLBACK');
            throw error;
        }
    },
    async getByUser(user_id) {
        const rows = await db.query(
            `SELECT p.*, u.nama AS nama_user, a.nama AS nama_alat
             FROM pinjaman p
             JOIN users u ON p.user_id = u.id
             JOIN alat a ON p.alat_id = a.id
             WHERE p.user_id = ?
             ORDER BY p.tanggal_pinjam DESC`,
            [user_id]
          );
          return rows;
    },
    async getAll() {
        const rows = await db.query(
            `SELECT p.*, u.nama AS nama_user, a.nama AS nama_alat
             FROM pinjaman p
             JOIN users u ON p.user_id = u.id
             JOIN alat a ON p.alat_id = a.id
             ORDER BY p.tanggal_pinjam DESC`
          );
          return rows;
    },
    async updateStatus(id, status) {
        await db.query(
            'UPDATE pinjaman SET status = ? WHERE id = ?',
            [status, id]
          );
          const rows = await db.query(
            `SELECT p.*, u.nama AS nama_user, a.nama AS nama_alat
             FROM pinjaman p
             JOIN users u ON p.user_id = u.id
             JOIN alat a ON p.alat_id = a.id
             WHERE p.id = ?`,
            [id]
          );
          return rows[0];
    }
}

module.exports = Pinjaman;