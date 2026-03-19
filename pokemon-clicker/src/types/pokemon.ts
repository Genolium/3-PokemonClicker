export interface Pokemon {
    id: number,
    name: string,
    nickname?: string,
    weight: number,
    totalEarned?: number,
    caughtAt?: number,
    sprites: {
        front_default: string;
        other: {
            official_artwork: {
                front_default: string;
            }
        }
    },
    types: {
        type: {
            name: string;
        }
    }[];
}