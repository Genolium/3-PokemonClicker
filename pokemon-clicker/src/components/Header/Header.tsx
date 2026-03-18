import { useSelector } from 'react-redux';
import styles from './Header.module.css';
import type { RootState } from '../../store/store';

export const Header = () => {
    const balance = useSelector((state: RootState) => state.money.balance);

    return (
        <div className={styles.wrapper}>
            <div className={styles.logoContainer}>
                <img src="/logo/united.png" alt="Pokemon Clicker" className={styles.logo} />
            </div>

            <div className={styles.coinContainer}>
                <img src="/icons/coin.png" alt="coin" className={styles.coin} />
                <p className={styles.coinText}>{balance}</p>
            </div>
        </div>
    );
};