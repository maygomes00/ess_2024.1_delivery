import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import { Pedido } from "../../../../shared/types/User";
import { Item } from "../../../../shared/types/Item";
import NoOrdersModal from "../../../../shared/components/NoOrdersModal/NoOrdersModal";
import { formatDate } from "../../../../shared/utils/dateUtils";
import OrderBoxHeader from "./OrderBoxHeader";
import { fetchOrders } from "./FetchOrders/fetchOrders";
import { groupItemsByRestaurant } from "./GroupItemsByRestaurant/groupItemsByRestaurant";
import RestaurantOrderItems from "./RestaurantOrderItems";

const UserHistory = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const [orders, setOrders] = useState<Pedido[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<{ [key: string]: Item }>({});
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    fetchOrders(user_id!, setOrders, setShowModal, setError, setItems);
  }, [user_id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (showModal) {
    return <NoOrdersModal show={showModal} handleClose={handleCloseModal} />;
  }

  return (
    <div className={styles.userHistory}>
      <h1 className={styles.title}>Histórico</h1>
      {orders.map((order) => (
        <div className={styles.order} key={order.order_id}>
          <OrderBoxHeader date={formatDate(order.data)} orderId={order.order_id} />
          <div className={styles.orderBox}>
            <ul className={styles.itemsInfo} data-cy="pedidos">
              <RestaurantOrderItems groupedItems={groupItemsByRestaurant(order.itens, items)} items={items} />
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserHistory;
