const db = require('../config/database');

const Pinjaman = {
    async create(data) {
        const result = await db.query('INSERT INTO pinjaman SET ?', [data]);
        return result;
    },
    async getByUser(user_id) {
        const rows = await db.query('SELECT * FROM pinjaman WHERE user_id = ?', [user_id]);
        return rows;
    },
    async getAll() {
        const rows = await db.query('SELECT * FROM pinjaman');
        return rows;
    },
    async updateStatus(id, status) {
        const result = await db.query('UPDATE pinjaman SET status = ? WHERE id = ?', [status, id]);
        return result;
    }
}

module.exports = Pinjaman;