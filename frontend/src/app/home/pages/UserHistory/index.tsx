import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import { getUserOrders } from "../../../../shared/services/userService";
import { getItemDetails } from "../../../../shared/services/ItensService";
import { Pedido, UserItem } from "../../../../shared/types/User";
import { Item } from "../../../../shared/types/Item";
import NoOrdersModal from "../../../../shared/components/NoOrdersModal/NoOrdersModal";
import { formatDate } from "../../../../shared/utils/dateUtils";
import RestaurantHeader from "../../../../shared/components/RestaurantHeader/index";
import UserItemDetails from "../../../../shared/components/UserItemDetails";
import OrderBoxHeader from "../../components/UserHistory/OrderBoxHeader";

const UserHistory = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const [orders, setOrders] = useState<Pedido[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<{ [key: string]: Item }>({});
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user_id) {
        setError("User ID não encontrado");
        return;
      }

      try {
        const orders = await getUserOrders(user_id);
        if (orders.length === 0) {
          setShowModal(true);
          return;
        }
        setOrders(orders);

        // Fetch item details for each item in each order
        const itemPromises = orders.flatMap((order) =>
          order.itens.map((userItem) => getItemDetails(userItem.produto_id))
        );
        const itemsArray = await Promise.all(itemPromises);

        // Map items by their ID for quick access
        const itemsMap: { [key: string]: Item } = {};
        itemsArray.forEach((item) => {
          itemsMap[item.id] = item;
        });
        setItems(itemsMap);
      } catch (error) {
        setError("Erro ao pegar histórico de pedidos do usuário");
      }
    };

    fetchOrders();
  }, [user_id]);

  const groupItemsByRestaurant = (userItems: UserItem[]) => {
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

  if (error) {
    return <div>{error}</div>;
  }

  if (showModal) {
    return <NoOrdersModal show={showModal} handleClose={handleCloseModal} />;
  }

  // componente
  return (
    <div className={styles.userHistory}>
      <h1>Histórico</h1>
      {orders.map((order) => (
        <div className={styles.order} key={order.order_id}>
          <OrderBoxHeader
            date={formatDate(order.data)}
            orderId={order.order_id}
          />
          <div className={styles.orderBox}>
            <ul className={styles.itemsInfo}>
              {Object.entries(groupItemsByRestaurant(order.itens)).map(
                ([restaurantId, userItems]) => (
                  <li key={restaurantId} className={styles.list}>
                    <RestaurantHeader restaurantId={restaurantId} />
                    <ul>
                      {userItems.map((userItem) => (
                        <UserItemDetails
                          key={userItem.produto_id}
                          userItem={userItem}
                          item={items[userItem.produto_id]}
                        />
                      ))}
                    </ul>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserHistory;
