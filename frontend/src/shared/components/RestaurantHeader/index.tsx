import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import restaurantProfile from "../../assets/circle-64.png";
import { getRestaurant } from "../../../shared/services/GetRestaurantService";
import { Restaurant } from "../../../shared/types/Restaurant";

interface RestaurantHeaderProps {
  restaurantId: string;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({
  restaurantId,
}) => {
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState<string>("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const restaurant: Restaurant = await getRestaurant(restaurantId);
        setRestaurantName(restaurant.restaurant_name);
      } catch (error) {
        console.error("Erro ao pegar restaurante", error);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

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
      <h3>{restaurantName}</h3>
    </div>
  );
};

export default RestaurantHeader;
