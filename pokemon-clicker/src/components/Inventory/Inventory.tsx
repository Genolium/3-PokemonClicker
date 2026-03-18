import React from 'react';
import styles from './Inventory.module.css';

export const Inventory: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Inventory</h1>
            <div className={styles.list}>

            </div>
        </div>
    );
};
