import { UserItem } from "../../../../../shared/types/User";
import { Item } from "../../../../../shared/types/Item";

export const groupItemsByRestaurant = (
  userItems: UserItem[],
  items: { [key: string]: Item }
): { [key: string]: UserItem[] } => {
  const groupedItems: { [key: string]: UserItem[] } = {};

  userItems.forEach((userItem) => {
    const item = items[userItem.produto_id];
    if (item) {
      if (!groupedItems[item.restaurant_id]) {
        groupedItems[item.restaurant_id] = [];
      }
      groupedItems[item.restaurant_id].push(userItem);
    }
  });

  return groupedItems;
};
