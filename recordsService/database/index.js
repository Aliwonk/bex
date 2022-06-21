import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({path: 'database/db.env'});
const db = process.env.DATABASE || 'mysql',
dbHost = process.env.DB_HOST || 'database',
dbPort = process.env.DB_PORT || 3306,
dbName = process.env.DB_NAME || 'recordsservice',
dbLogin = process.env.DB_LOGIN || 'root',
dbPassword = process.env.DB_PASSWORD || 'root';

const dataBase = new Sequelize(dbName, dbLogin, dbPassword, {
    dialect: db,
    host: dbHost,
    port: dbPort,
    define: {
        timestamps: true
    },
    logging: false
});

export default dataBase;