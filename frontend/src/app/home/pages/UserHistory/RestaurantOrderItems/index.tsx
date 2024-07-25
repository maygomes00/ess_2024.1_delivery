import React from "react";
import styles from "./index.module.css";
import { UserItem } from "../../../../../shared/types/User";
import { Item } from "../../../../../shared/types/Item";
import RestaurantHeader from "../../../../../shared/components/RestaurantHeader";
import UserItemDetails from "../../../../../shared/components/UserItemDetails";

interface RestaurantOrderItemsProps {
  groupedItems: { [key: string]: UserItem[] };
  items: { [key: string]: Item };
  setUnavailableModal: (value: boolean) => void;
}

const RestaurantOrderItems: React.FC<RestaurantOrderItemsProps> = ({ groupedItems, items, setUnavailableModal }) => {
  return (
    <>
      {Object.entries(groupedItems).map(([restaurantId, userItems]) => (
        <li key={restaurantId} className={styles.list}>
          <RestaurantHeader restaurantId={restaurantId} />
          <ul data-cy="pedidos-itens">
            {userItems.map((userItem) => (
              <UserItemDetails
                key={userItem.produto_id}
                restaurantId={restaurantId}
                userItem={userItem}
                item={items[userItem.produto_id]}
                setUnavailableModal={setUnavailableModal}
              />
            ))}
          </ul>
        </li>
      ))}
    </>
  );
};

export default RestaurantOrderItems;
