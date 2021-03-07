import stageDropData from 'gamedata/stageDrop.json';

let itemDropData = {}

// from stages
stageDropData.forEach(stage => {
    const { materials, trainItems, expPotions, ...rest } = stage

    const dropItems = [materials, trainItems, expPotions]

    dropItems.forEach(items => {
        items.forEach(item => {
            const newDrop = { rarity: item.rarity, ...rest }

            if (itemDropData[item.id]) {
                itemDropData[item.id].drop.push(newDrop)
            } else {
                itemDropData[item.id] = {
                    drop: [newDrop]
                }
            }
        })
    })
})

// not available from stages
//legendary items

for (let i = 1; i < 11; i++) {
    itemDropData[(500 + i).toString()] = { drop: [] }
}

// skill items
for (let i = 1; i < 3; i++) {
    itemDropData[(900 + i).toString()] = { drop: [] }
}

export default itemDropData