//ckeck environnement
const env = process.env.NODE_ENV || 'development';

//fetch environnement config
const config = require('./config.json');
const envConfig = config[env];

//add environnement config values to process.env
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);