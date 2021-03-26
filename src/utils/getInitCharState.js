const getInitCharState = (charId) => ({
    id: charId,
    level: '',
    star: charId === undefined ? '' : 4 - parseInt(charId[0]),
    bond: 1,
    discipline: charId === undefined ? '' : (charId[0] === '4' ? '-' : 0),
    potential: 1,
    potentialSub: 0,
})

export default getInitCharState 