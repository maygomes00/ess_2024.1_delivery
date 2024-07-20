import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getUserOrders } from "../../../../shared/services/userService";
import { getItemDetails } from "../../../../shared/services/ItensService";

import { Pedido } from "../../../../shared/types/User";
import { Item } from "../../../../shared/types/types";

import styles from "./index.module.css";

const UserHistory = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const [orders, setOrders] = useState<Pedido[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<{ [key: string]: Item }>({});

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user_id) {
        setError("User ID não encontrado");
        return;
      }

      try {
        const orders = await getUserOrders(user_id);
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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.userHistory}>
      <h1>Histórico</h1>
      {orders.map((order) => (
        <div className={styles.order}>
          <p>Data: {order.data}</p>
          <div key={order.order_id} className={styles.orderBox}>
            <h3>Pedido ID: {order.order_id}</h3>
            <h4>Itens:</h4>
            <ul className={styles.list}>
              {order.itens.map((userItem) => {
                const item = items[userItem.produto_id];
                return item ? (
                  <li key={userItem.produto_id}>
                    {item.name} - Quantidade: {userItem.quantity} - Preço:{" "}
                    {item.price}
                  </li>
                ) : (
                  <li key={userItem.produto_id}>
                    Carregando detalhes do item...
                  </li>
                );
              })}
            </ul>
            <p>Total: {order.total}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserHistory;
