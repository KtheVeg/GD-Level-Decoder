const fs = require('fs')
const Crypto = require('./crypto.js')
let crypto = new Crypto()


module.exports = function (input, gdSave) {
    fs.readFile(input, 'utf8', function (err, saveData) {
        if (err) throw("Save file is not found or cannot be opened!");
        let encoded = crypto.encode(saveData)
        if (!encoded) return
        fs.writeFileSync(gdSave, encoded, 'utf8')
        console.log(`Saved!`);
    })
}