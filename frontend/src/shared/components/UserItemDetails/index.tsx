import React from "react";
import { useNavigate } from "react-router-dom";
import { UserItem } from "../../types/User";
import { Item } from "../../types/Item";
import styles from "./index.module.css";

interface UserItemDetailsProps {
  userItem: UserItem;
  item: Item | undefined;
}

const UserItemDetails: React.FC<UserItemDetailsProps> = ({
  userItem,
  item,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/item/${item?.id}`);
  };

  return item ? (
    <li key={userItem.produto_id} className={styles.list} onClick={handleClick}>
      <strong>{userItem.quantity}</strong> {item.name} - Preço: {item.price}
    </li>
  ) : (
    <li key={userItem.produto_id} className={styles.list}>
      Carregando detalhes do item...
    </li>
  );
};

export default UserItemDetails;
