const env = process.env.NODE_ENV || 'development';

const config = require('./config.json');
const envConfig = config[env];

// console.log(env);
// console.log(envConfig);
// console.log(Object.keys(envConfig));

Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);

