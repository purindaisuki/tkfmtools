import charsData from 'data/character.json';

const charByPosition = charsData.reduce((newData, c, i) => {
    newData[c.tags.position - 5].push({ id: c.id, idx: i })
    return newData
}, [...Array(5)].map(i => []))

export default charByPosition