'use strict'

const database_config = require('../../config/database');
const { Pool } = require('pg');
const pool = new Pool(database_config);

/**
 * Exécuter une requête, passée en argument, sur la base de données
 * @param {Object} request 
 */
exports.handle_databsase = async function (request) {
    const client = await pool.connect();
    let res = await client.query(request);
    client.release();
    return res;
}