const charData = require('../data/character.json');
const potentialData = require('../data/potential.json');

const calcCharPotential = function (char, from, to) {
    const result = {
        items: {},
        money: 0,
        buff: {
            ATK: 0,
            HP: 0,
            PASSIVE: 0
        },
    }
    const type = (char === 'nr' || char[0] === '4' || char[0] === '3')
        ? 3
        : charData.find(c => c.id === char).potentialType

    const stages = potentialData.type[type]
    for (let i = from[0] - 1; i < to[0] - 1 + 1; i++) {
        let stage = stages[i]
        for (
            let j = i === from[0] - 1 ? from[1] - 1 : 0;
            j < (i === to[0] - 1 ? to[1] : 6);
            j++
        ) {
            if (j < 0) continue

            let id = stage.pattern[j] + stage.rank[j]
            if (result.items[id]) {
                result.items[id] += stage.num[j]
            } else {
                result.items[id] = stage.num[j]
            }
            result.money += (i + 1) * 8000
            let buff = potentialData.itemMap[stage.pattern[j]].type
            result.buff[buff] += stage.buff[j]
        }
    }
    // parse result
    let parsedItem = {}
    for (const [key, value] of Object.entries(result.items)) {
        let itemId = potentialData.itemMap[key[0]].id.map(id => (
            key[1] === '9' ? '902'
                : key[1] === '8' ? '901'
                    : (parseInt(key[1]) * 100 + id).toString()
        ))
        for (let i of itemId) {
            if (parsedItem[i]) {
                parsedItem[i] += value
            } else {
                parsedItem[i] = value
            }
        }
    }

    result.items = parsedItem
    return result
}

const calcCharStats = function (
    character,
    level,
    potential,
    potentialSub,
    discipline,
    star,
    initATK,
    initHP
) {
    if (!character) {
        return
    }
    
    const levelBuff = 1.1 ** (level - 1)
    const { buff } = calcCharPotential(
        character,
        [1, 0],
        [potential, potentialSub]
    )
    const disciplineBuff = 1 + discipline * .05
    const starBuff = (star + 5) / (9 - character[0])

    return ({
        ATK: Math.floor(initATK * levelBuff * (1 + buff.ATK / 100) * disciplineBuff * starBuff),
        HP: Math.floor(initHP * levelBuff * (1 + buff.HP / 100) * disciplineBuff * starBuff)
    })
}

module.exports = calcCharStats
module.exports.calcCharPotential = calcCharPotential