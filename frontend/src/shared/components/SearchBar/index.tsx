import React, { useEffect, useState } from "react";
import SearchBar from "./searchBar";
import { getAllRestaurants } from "../../services/GetRestaurantService";
import { Restaurant } from "../../../shared/types/Restaurant";

const RestaurantSearchPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurantsList = await getAllRestaurants();
        setRestaurants(restaurantsList);
      } catch (err) {
        setError("Erro ao pegar lista de restaurantes");
      }
    };

    fetchRestaurants();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <SearchBar restaurants={restaurants} />
    </div>
  );
};

export default RestaurantSearchPage;
