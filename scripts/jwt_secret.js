const crypto = require('crypto');

// Generar un secret seguro de 256 bits (32 bytes)
const jwtSecret = crypto.randomBytes(32).toString('hex');

console.log(jwtSecret);