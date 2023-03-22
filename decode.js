const fs = require('fs')
const Crypto = require('./crypto.js')
let crypto = new Crypto()


module.exports = function (gdSave, out, verbosity) {
    if (!verbosity) verbosity = false;
    if (verbosity) console.log(`Reading save file...`);
    fs.readFile(gdSave, 'utf8', function (err, saveData) {
        if (err) throw("Save file is not found or cannot be opened!");
        if (verbosity) console.log(`Decoding Save...`);
        let decoded = crypto.decode(saveData, verbosity)
        if (!decoded) return
        if (verbosity) console.log(`Saving...`);
        fs.writeFileSync(out, decoded, 'utf8')
        console.log(`Saved!`);
    })
}