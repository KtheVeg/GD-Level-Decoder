const fs = require('fs')
const Crypto = require('./crypto.js')
let crypto = new Crypto()


module.exports = function (input, gdSave, verbosity) {
    if (!verbosity) verbosity = false;
    if (verbosity) console.log(`Reading save file...`);
    fs.readFile(input, 'utf8', function (err, saveData) {
        if (err) throw("Save file is not found or cannot be opened!");
        if (verbosity) console.log(`Encoding Save...`);
        let encoded = crypto.encode(saveData, verbosity)
        if (!encoded) return
        if (verbosity) console.log(`Saving...`);
        fs.writeFileSync(gdSave, encoded, 'utf8')
        console.log(`Saved!`);
    })
}