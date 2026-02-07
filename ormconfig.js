const { DataSource } = require('typeorm');
const dbConfig = {
    synchronize: false,
    migrations: ['migrations/*.{ts,js}'],
};

switch(process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ['**/*.entity.{ts,js}'],
        });
        break;
    case 'test':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['**/*.entity.{ts,js}'],
        });
        break;
    case 'production':
        break;
    default:
        throw new Error(`Unknown environment: ${process.env.NODE_ENV}`);
}

const dataSource = new DataSource(dbConfig);
module.exports = { dataSource };