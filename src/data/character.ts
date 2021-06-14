interface Character {
    id: string,
    rarity: number,
    tags: {
        attribute: number,
        position: number,
        race: number,
        body: number,
        oppai: number,
        rank: number,
        else: Array<number>,
        available: boolean
    },
    stats: {
        initATK: number,
        initHP: number
    },
    potentialType: number
}