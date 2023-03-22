const zlib = require('zlib')

module.exports = class crypto {

    xor(str, key) {     
        str = String(str).split('').map(letter => letter.charCodeAt());
        let res = "";
        for (let i = 0; i < str.length; i++) res += String.fromCodePoint(str[i] ^ key);
        return res; 
    }

    decode(data, verbosity) {
        if (data.startsWith('<?xml version="1.0"?>')) return data
        if (verbosity) console.log("XOR deciphering...");
        let decoded = this.xor(data, 11)
        if (verbosity) console.log("Decoding Base64...");
        decoded = Buffer.from(decoded, 'base64')
        if (verbosity) console.log("Attempting to decompress...");
        try { return zlib.unzipSync(decoded).toString() }
        catch (e) { return console.log("Error! GD save file seems to be corrupt!") }
    }
    encode(data, verbosity) {
        if (verbosity) console.log("Compressing...");
        let encoded = zlib.gzipSync(data);
        if (verbosity) console.log("Encoding Base64...");
        encoded = encoded.toString('base64')
        if (verbosity) console.log("XOR ciphering...");
        return this.xor(encoded, 11)
    }
}