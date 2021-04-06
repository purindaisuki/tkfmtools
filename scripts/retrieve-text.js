const page_tr = require('../src/data/string/page_zh-TW.json');
const char_tr = require('../src/data/string/character_zh-TW.json');
const item_tr = require('../src/data/string/item_zh-TW.json');
const page_en = require('../src/data/string/page_en.json');
const char_en = require('../src/data/string/character_en.json');
const item_en = require('../src/data/string/item_en.json');
const page_kr = require('../src/data/string/page_kr.json');
const char_kr = require('../src/data/string/character_kr.json');
const item_kr = require('../src/data/string/item_kr.json');

const fs = require('fs');

const strings = [[page_tr, page_en, page_kr], [char_tr, char_en, char_kr], [item_tr, item_en, item_kr]]

const allTexts = {}

const iterate = (obj, parentKey, newData, lang) => {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') {
            iterate(obj[key], parentKey + '_' + key, newData, lang)
        } else {
            if (newData[parentKey + '_' + key]) {
                newData[parentKey + '_' + key][lang] = obj[key]
            }
            else {
                newData[parentKey + '_' + key] = { [lang]: obj[key] }
            }
        }
    })
}

strings.forEach((string, i) => {
    const data = {}
    iterate(string[0], 'root', data, 'zh-TW')
    iterate(string[1], 'root', data, 'en')
    iterate(string[2], 'root', data, 'kr')
    fs.writeFile('./texts_' + i + '.json', JSON.stringify(data), (err) => {
        if (err) console.log(err);
    })
})
