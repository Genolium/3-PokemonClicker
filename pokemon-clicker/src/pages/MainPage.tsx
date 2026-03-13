import { useEffect } from "react";
import { Button, Card, Spin } from "antd";
import { Header } from "../components/Header/Header"
import { MainLayout } from "../components/MainLayout/MainLayout"
import { fetchRandomPokemon, setPokemons } from "../store/pokemonThunks";
import { setBalance, addMoney } from "../store/moneySlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";

export const MainPage = () => {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state: RootState) => state.pokemon);

    const pokemons = useSelector((state: RootState) => state.pokemon.items);
    const balance = useSelector((state: RootState) => state.money.balance);

    useEffect(() => {
        const email = localStorage.getItem('pokemon_user_email');
        if (email) {
            const userSave = localStorage.getItem(`save_${email}`);
            if (userSave) {
                const parsedData = JSON.parse(userSave);
                dispatch(setPokemons(parsedData.pokemons));
                dispatch(setBalance(parsedData.balance));
            }
        }
    }, [dispatch]);

    useEffect(() => {
        const incomePerSecond = pokemons.reduce((sum, pokemon) => sum + (pokemon.weight || 0), 0);
        if (incomePerSecond === 0) return;

        const intervalId = setInterval(() => {
            dispatch(addMoney(incomePerSecond));
        }, 2000);

        return () => clearInterval(intervalId);
    }, [pokemons, dispatch]);

    return (
        <MainLayout>
            <Header />

            <div>

                {items.map((pokemon) => (
                    <Card key={pokemon.id} title={pokemon.name} cover={<img src={pokemon.sprites.front_default} alt={pokemon.name} />} style={{ width: 300, margin: '16px' }}>
                        <h1>{pokemon.id} - {pokemon.name}</h1>
                        <p>Вес: {pokemon.weight}</p>
                    </Card>
                ))}
            </div>
        </MainLayout>
    )
}