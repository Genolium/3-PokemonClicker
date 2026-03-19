import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Card, Button, Spin, message } from 'antd';
import { fetchShopItems } from '../../store/shopSlice';
import type { RootState, AppDispatch } from '../../store/store';
import { subtractMoney } from '../../store/moneySlice';
import { addItem, findFirstFreeSpot } from '../../store/inventorySlice';
import type { ShopItem } from '../../types/shop';
import styles from './Shop.module.css';

export const Shop = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.shop);
  const { balance } = useSelector((state: RootState) => state.money);
  const inventoryItems = useSelector((state: RootState) => state.inventory.items);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchShopItems());
    }
  }, [dispatch, items.length]);

  const handleBuy = (item: ShopItem) => {
    if (balance < item.cost) {
      message.error('Недостаточно денег!');
      return;
    }
    
    const spot = findFirstFreeSpot(inventoryItems, item.w, item.h);
    if (!spot) {
      message.error('В инвентаре нет места!');
      return;
    }

    dispatch(subtractMoney(item.cost));
    dispatch(addItem({
      apiId: item.id,
      name: item.name,
      sprite: item.sprite,
      w: item.w,
      h: item.h,
    }));
    
    message.success(`Вы купили ${item.name}!`);
  };

  const renderItems = (category: ShopItem['category']) => {
    if (loading) return <Spin style={{ display: 'block', margin: '24px auto' }} />;

    const filteredItems = items.filter(item => item.category === category);
    
    return (
      <div className={styles.itemList}>
        {filteredItems.map(item => (
          <Card key={item.id} className={styles.itemCard}>
            <div className={styles.itemImageWrapper}>
              <img src={item.sprite} alt={item.name} className={styles.itemImage} />
            </div>
            <p className={styles.itemName}>{item.name.replace('-', ' ')}</p>
            <Button 
              type="primary" 
              onClick={() => handleBuy(item)}
              disabled={balance < item.cost}
              block
            >
              Купить за {item.cost} 💰
            </Button>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.shopContainer}>
      <h1 className={styles.title}>Shop</h1>
      <Tabs 
        defaultActiveKey="pokeballs"
        centered
        items={[
          { key: 'pokeballs', label: 'Покеболы', children: renderItems('pokeballs') },
          { key: 'berries', label: 'Ягоды', children: renderItems('berries') },
        ]} 
      />
    </div>
  );
};
