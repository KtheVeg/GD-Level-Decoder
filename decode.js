const fs = require('fs')
const Crypto = require('./crypto.js')
let crypto = new Crypto()


module.exports = function (gdSave, out) {
    fs.readFile(gdSave, 'utf8', function (err, saveData) {
        if (err) throw("Save file is not found or cannot be opened!");
        let decoded = crypto.decode(saveData)
        if (!decoded) return
        fs.writeFileSync(out, decoded, 'utf8')
        console.log(`Saved!`);
    })
}