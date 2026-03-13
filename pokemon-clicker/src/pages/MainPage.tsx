import { Button, Card, Spin } from "antd";
import { Header } from "../components/Header/Header"
import { MainLayout } from "../components/MainLayout/MainLayout"
import { fetchRandomPokemon } from "../store/pokemonThunks";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";

export const MainPage = () => {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state: RootState) => state.pokemon);

    return (
        <MainLayout>
            <Header />

            <div>
                <Button type="primary" onClick={() => dispatch(fetchRandomPokemon())}>{loading ? <Spin /> : 'Get random pokemon'}</Button>

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