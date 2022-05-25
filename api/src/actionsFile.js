const fs = require('fs');

const getDataFile = (nameFile) => {
    try {
        const data = fs.readFileSync(nameFile, 'utf8');
        return data.split('\r\n').map(line => line.split(','))
    } catch (error) {
        console.log(error);
        return null
    }
}

module.exports = { getDataFile };