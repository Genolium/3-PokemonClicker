import React, { type DragEvent, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { moveItem } from '../../store/inventorySlice';
import styles from './Inventory.module.css';

const GRID_W = 5;
const GRID_H = 11;

export const Inventory: React.FC = () => {
    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.inventory.items);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleDragStart = (e: DragEvent<HTMLDivElement>, uid: string) => {
        e.dataTransfer.setData("itemUid", uid);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const uid = e.dataTransfer.getData("itemUid");
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();

        const activeCellSize = rect.width / GRID_W;

        const dropX = e.clientX - rect.left;
        const dropY = e.clientY - rect.top;

        const newX = Math.floor(dropX / activeCellSize);
        const newY = Math.floor(dropY / activeCellSize);

        dispatch(moveItem({ uid, newX, newY }));
    };

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Inventory</h1>

            <div
                ref={containerRef}
                className={styles.gridContainer}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {Array.from({ length: GRID_W * GRID_H }).map((_, i) => (
                    <div key={`cell-${i}`} className={styles.gridCell}>
                        <div className={styles.cellInner} />
                    </div>
                ))}

                {items.map((item: any) => (
                    <div
                        key={item.uid}
                        className={styles.item}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item.uid)}
                        style={{
                            left: `${(item.x / GRID_W) * 100}%`,
                            top: `${(item.y / GRID_H) * 100}%`,
                            width: `${(item.w / GRID_W) * 100}%`,
                            height: `${(item.h / GRID_H) * 100}%`,
                        }}
                    >
                        <img
                            src={item.sprite}
                            alt={item.name}
                            className={styles.itemImage}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
