const texts = require('./csvjson.json');
const fs = require('fs');

const unflattenedTextx = {}

Object.entries(texts[0]).forEach(entry => {
    const keys = entry[0].split('_').slice(1)
    keys.reduce((text, key, i) => {
        return text[key] || (text[key] = isNaN(Number(keys[i + 1])) ? (keys.length - 1 == i ? entry[1] : {}) : [])
    }, unflattenedTextx)
})

fs.writeFile('./scripts/res.json', JSON.stringify(unflattenedTextx), (err) => {
    if (err) console.log(err);
})