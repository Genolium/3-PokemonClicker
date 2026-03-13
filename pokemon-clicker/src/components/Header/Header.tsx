import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.css';
import type { RootState } from '../../store/store';
import { Button } from 'antd';
import { addMoney, substractMoney } from '../../store/moneySlice';

export const Header = () => {
    const balance = useSelector((state: RootState) => state.money.balance);
    const dispatch = useDispatch();

    return (
        <div className={styles.wrapper}>
            <div className={styles.logoContainer}>
                <img src="/logo/united.png" alt="Pokemon Clicker" className={styles.logo} />
            </div>

            <div className={styles.coinContainer}>
                <div>
                    <Button type="primary" onClick={() => dispatch(addMoney(100))}>+</Button>
                    <Button color="danger" variant="solid" onClick={() => dispatch(substractMoney(100))}>-</Button>
                </div>
                <img src="/icons/coin.png" alt="coin" className={styles.coin} />
                <p className={styles.coinText}>{balance}</p>
            </div>
        </div>
    );
};