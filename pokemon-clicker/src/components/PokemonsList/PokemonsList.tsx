import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import styles from './PokemonsList.module.css';
import { PokemonCard } from '../PokemonCard/PokemonCard';

export const PokemonsList: React.FC = () => {
    const { items } = useSelector((state: RootState) => state.pokemon);

    return (
        <div className={styles.wrapper}>
            <div className={styles.list}>
                {items.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
};
