import { Logger } from '@nestjs/common';
import * as mysql from 'promise-mysql';
import keys from './keys'

const pool = mysql.createPool(keys.database)

pool.getConnection().then(connection => {
    pool.releaseConnection(connection);
    Logger.log("BBDD conectada: " + keys.database.host)
})

export default pool