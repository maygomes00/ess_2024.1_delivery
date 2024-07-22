import React from "react";
import styles from "./index.module.css";

interface OrderBoxHeaderProps {
  date: string;
  orderId: number;
}

const OrderBoxHeader: React.FC<OrderBoxHeaderProps> = ({ date, orderId }) => {
  return (
    <div className={styles.orderBoxHeader}>
      <p>{date}</p>
      <p className={styles.light}>{`pedido n° ${orderId}`}</p>
    </div>
  );
};

export default OrderBoxHeader;
