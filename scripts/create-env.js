const fs = require('fs'); //módulo de node

fs.writeFileSync('./.env', `API=${process.env.API}\n`);