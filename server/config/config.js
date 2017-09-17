const path = require('path');

export const DEV = 'development';
export const PROD = 'production';
export const HOT = process.env.HOT || false;
export const ENV = process.env.NODE_ENV || DEV;
export const PORT = process.env.PORT || 3000;
export const DIST = path.join(__dirname, '../../', '/dist/');

