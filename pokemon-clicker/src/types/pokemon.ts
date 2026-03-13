export interface Pokemon {
    id: number,
    name: string,
    weight: number,
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