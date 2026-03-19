import { useEffect, useState } from "react";
import { Collapse } from "antd";
import { Header } from "../components/Header/Header"
import { MainLayout } from "../components/MainLayout/MainLayout"
import { setPokemons, tickPokemonsIncome } from "../store/pokemonThunks";
import { setBalance, addMoney } from "../store/moneySlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setInventory } from "../store/inventorySlice";
import { Inventory } from "../components/Inventory/Inventory";
import { PokemonsList } from "../components/PokemonsList/PokemonsList";
import { Garden } from "../components/Garden/Garden";
import { Shop } from "../components/Shop/Shop";
import styles from './MainPage.module.css';

export const MainPage = () => {
    const dispatch = useDispatch();
    const pokemons = useSelector((state: RootState) => state.pokemon.items);
    const balance = useSelector((state: RootState) => state.money.balance);
    const inventory = useSelector((state: RootState) => state.inventory.items);
    
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem('pokemon_user_email');
        if (email) {
            const userSave = localStorage.getItem(`save_${email}`);
            if (userSave) {
                const parsedData = JSON.parse(userSave);
                dispatch(setPokemons(parsedData.pokemons || []));
                dispatch(setBalance(parsedData.balance || 0));
                if (parsedData.inventory) {
                    dispatch(setInventory(parsedData.inventory));
                }
            }
        }
        
        setIsLoaded(true);
    }, [dispatch]);

    useEffect(() => {
        if (!isLoaded) return;
        const email = localStorage.getItem('pokemon_user_email');
        if (email) {
            const saveToStore = {
                balance,
                pokemons,
                inventory,
            };
            localStorage.setItem(`save_${email}`, JSON.stringify(saveToStore));
        }
    }, [balance, pokemons, inventory, isLoaded]);

    useEffect(() => {
        const incomePerSecond = pokemons.reduce((sum, pokemon) => sum + (pokemon.weight || 0), 0);
        if (incomePerSecond === 0) return;

        const intervalId = setInterval(() => {
            dispatch(addMoney(incomePerSecond));
            dispatch(tickPokemonsIncome());
        }, 1000);

        return () => clearInterval(intervalId);
    }, [pokemons, dispatch]);

    const collapseItems = [
        {
            key: '1',
            label: <span className={styles.customHeader}>My Pokemons</span>,
            children: <PokemonsList />,
        },
        {
            key: '2',
            label: <span className={styles.customHeader}>Garden</span>,
            children: <Garden />,
        },
        {
            key: '3',
            label: <span className={styles.customHeader}>Hunt</span>,
            children: <div style={{ height: '300px' }}></div>,
        }
    ];

    const styledCollapseItems = collapseItems.map(item => ({
        ...item,
        style: {
            backgroundColor: 'white',
            borderRadius: 16,
            border: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
        }
    }));

    return (
        <MainLayout>
            <Header />
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px', justifyContent: 'space-between', height: '100%' }}>
                <Inventory />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                    <Collapse
                        style={{ width: '50vw', display: 'flex', flexDirection: 'column', gap: '24px', border: 'none', backgroundColor: 'transparent' }}
                        items={styledCollapseItems}
                        defaultActiveKey={['1']}
                        expandIcon={({ isActive }) => (
                            <div style={{ color: '#3B4CCA', fontSize: 16, display: 'flex', alignItems: 'center', transition: 'transform 0.2s', transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>
                            </div>
                        )}
                    />
                </div>
                <Shop />
            </div>
        </MainLayout>
    )
}