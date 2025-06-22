const db = require('../config/database');

const Alat = {
    async getAll() {
        const rows = await db.query('SELECT * FROM alat');
        return rows;
    },
    async getById(id) {
        const [row] = await db.query('SELECT * FROM alat WHERE id = ?', [id]);
        return row;
    },
    async create(data) {
        const result = await db.query('INSERT INTO alat SET ?', [data]);
        return result;
    },
    async update(id, data) {
        const result = await db.query('UPDATE alat SET ? WHERE id = ?', [data, id]);
        return result;
    },
    async delete(id) {
        const result = await db.query('DELETE FROM alat WHERE id = ?', [id]);
        return result;
    },
}

module.exports = Alat;