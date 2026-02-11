import { url } from 'inspector';

const { DataSource } = require('typeorm');
console.log('NODE_ENV:', process.env.NODE_ENV);
const dbConfig = {
    synchronize: false,
    migrations: ['migrations/*.{ts,js}'],
};

switch(process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'db.sqlite',
            migrationsRun: true,
        });
        break;
    case 'test':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'test.sqlite',
            migrationsRun: true,
        });
        break;
    case 'production':
        Object.assign(dbConfig, {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            migrationsRun: true,
            ssl: {
                rejectUnauthorized: false,
            },
        });
        break;
    default:
        throw new Error(`Unknown environment ${process.env.NODE_ENV}`);
}
   
module.exports = dbConfig;                                                                                                                  