export interface ShopItem {
  id: number;
  name: string;
  cost: number;
  sprite: string;
  category: 'pokeballs' | 'berries';
  w: number;
  h: number;
}
