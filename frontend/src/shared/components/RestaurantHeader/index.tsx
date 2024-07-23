import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import restaurantProfile from "../../assets/circle-64.png";

interface RestaurantHeaderProps {
  restaurantId: string;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({
  restaurantId,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${restaurantId}`);
  };

  return (
    <div className={styles.listItemHeader} onClick={handleClick}>
      <img
        src={restaurantProfile}
        alt="restaurant"
        className={styles.restaurantImage}
      />
      <h3>Restaurante {restaurantId}</h3>
    </div>
  );
};

export default RestaurantHeader;
