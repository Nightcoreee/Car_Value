import { DataSource } from 'typeorm';
import * as path from 'path';

// Cách 1: Require trực tiếp
const dbConfig = require('./ormconfig');

console.log('Loaded config:', dbConfig); // ← Debug

export default new DataSource(dbConfig);