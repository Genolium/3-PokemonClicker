import React, { useState } from 'react';
import { Modal, Tabs, Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { feedPokemon, renamePokemon, removePokemon } from '../../store/pokemonThunks';
import { removeItem } from '../../store/inventorySlice';
import type { Pokemon } from '../../types/pokemon';
import styles from './PokemonCard.module.css';

interface PokemonCardProps {
    pokemon: Pokemon;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nicknameInput, setNicknameInput] = useState('');
    const dispatch = useDispatch();
    const inventoryItems = useSelector((state: RootState) => state.inventory.items);

    const berries = inventoryItems.filter(item => item.name.includes('berry'));
    const displayWeight = (pokemon.weight / 10).toFixed(1);
    const moneyPerSec = (pokemon.weight).toFixed(1);
    const daysSinceCaught = pokemon.caughtAt ? Math.floor((Date.now() - pokemon.caughtAt) / (1000 * 60 * 60 * 24)) : 0;

    const handleFeed = (uid: string) => {
        dispatch(removeItem(uid));
        dispatch(feedPokemon({ id: pokemon.id, weightIncrease: 1 }));
    };

    const handleRename = () => {
        dispatch(renamePokemon({ id: pokemon.id, name: nicknameInput }));
        setNicknameInput('');
    };

    const handleDelete = () => {
        dispatch(removePokemon(pokemon.id));
        setIsModalOpen(false);
    };

    const feedTab = (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', maxHeight: '400px', overflowY: 'auto' }}>
            {berries.length === 0 ? (
                <p>У вас нет ягод в инвентаре.</p>
            ) : (
                berries.map(berry => (
                    <div key={berry.uid} style={{ display: 'flex', padding: '16px', border: '1px solid #f0f0f0', borderRadius: '8px', width: '48%', gap: '12px' }}>
                        <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px' }}>
                            <img src={berry.sprite} alt={berry.name} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Ягода 1 уровня</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>Накорми ей покемона для увеличения веса на 0.1 кг</div>
                            </div>
                            <Button type="primary" onClick={() => handleFeed(berry.uid)} style={{ marginTop: '8px' }}>Накормить</Button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );

    const statsTab = (
        <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 'bold' }}>Вид</span>
                    <span>{pokemon.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 'bold' }}>Вес</span>
                    <span>{displayWeight} кг</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 'bold' }}>Суммарно заработано</span>
                    <span>{Math.floor(pokemon.totalEarned || 0)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 'bold' }}>Денег/сек</span>
                    <span>{moneyPerSec}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 'bold' }}>Возраст</span>
                    <span>{daysSinceCaught} {daysSinceCaught === 1 ? 'день' : daysSinceCaught >= 2 && daysSinceCaught <= 4 ? 'дня' : 'дней'}</span>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <Button danger type="primary" onClick={handleDelete}>Удалить покемона</Button>
                    <Input
                        placeholder="Псевдоним покемона"
                        value={nicknameInput}
                        onChange={(e) => setNicknameInput(e.target.value)}
                    />
                    <Button type="primary" onClick={handleRename}>Сохранить</Button>
                </div>
            </div>
        </div>
    );

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h2 className={styles.name}>{pokemon.nickname || pokemon.name}</h2>
                <img
                    src="/icons/mech.svg"
                    alt="settings"
                    onClick={() => setIsModalOpen(true)}
                    style={{ cursor: 'pointer' }}
                />
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
                    <span className={styles.statValue}>{displayWeight} кг</span>
                </div>
                <div className={styles.statRow}>
                    <span className={styles.statLabel}>Денег/сек</span>
                    <span className={styles.statValue}>{moneyPerSec}</span>
                </div>
            </div>

            <Modal
                title={`Управление покемоном ${pokemon.nickname || pokemon.name}`}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={700}
                destroyOnClose
            >
                <Tabs
                    defaultActiveKey="feed"
                    centered
                    items={[
                        { key: 'feed', label: 'Накормить', children: feedTab },
                        { key: 'stats', label: 'Статистика', children: statsTab }
                    ]}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                    <Button type="primary" onClick={() => setIsModalOpen(false)}>Закрыть</Button>
                </div>
            </Modal>
        </div>
    );
};
