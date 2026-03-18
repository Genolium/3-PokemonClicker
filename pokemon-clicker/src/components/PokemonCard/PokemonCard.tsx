import React from 'react';
import styles from './PokemonCard.module.css';

interface Pokemon {
    id: number;
    name: string;
    weight: number;
    sprites: {
        front_default: string;
    };
}

interface PokemonCardProps {
    pokemon: Pokemon;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h2 className={styles.name}>{pokemon.name}</h2>
                <img src="/icons/mech.svg" alt="settings" />
            </div>

            <div className={styles.imageContainer}>
                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className={styles.image}
                />
            </div>

            <div className={styles.statsContainer}>
                <div className={styles.statRow}>
                    <span className={styles.statLabel}>Вес</span>
                    <span className={styles.statValue}>{pokemon.weight} кг</span>
                </div>
                <div className={styles.statRow}>
                    <span className={styles.statLabel}>Денег/сек</span>
                    <span className={styles.statValue}>{pokemon.weight}</span>
                </div>
            </div>
        </div>
    );
};
