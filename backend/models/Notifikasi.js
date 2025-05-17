const db = require('../config/database');

const Notifikasi = {
    async create(user_id, pesan){
        const result = await db.query('INSERT INTO notifikasi SET ?', [{user_id, pesan}]);
        return result;
    }, 
    async getByUser(user_id){
        const rows = await db.query('SELECT * FROM notifikasi WHERE user_id = ?', [user_id]);
        return rows;
    },
    async tandaiBaca(id){
        const result = await db.query('UPDATE notifikasi SET status_dibaca = ? WHERE id = ?', [1, id]);
        return result;
    },
    async getAdminIds() {
        const result = await db.query('SELECT id FROM users WHERE role = ?', ['admin']);
        return result;
    }
}

module.exports = Notifikasi;