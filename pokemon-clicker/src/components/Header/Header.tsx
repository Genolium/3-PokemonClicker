import styles from './Header.module.css';

export const Header = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.logoContainer}>
                <img src="/logo/united.png" alt="Pokemon Clicker" className={styles.logo} />
            </div>

            <div className={styles.coinContainer}>
                <img src="/icons/coin.png" alt="coin" className={styles.coin} />
                <p className={styles.coinText}>100 000 000</p>
            </div>
        </div>
    );
};