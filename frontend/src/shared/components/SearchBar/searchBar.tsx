// SearchBar.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "../../../shared/types/Restaurant";
import styles from "./index.module.css";

interface SearchBarProps {
  restaurants: Restaurant[];
}

const SearchBar: React.FC<SearchBarProps> = ({ restaurants }) => {
  const [query, setQuery] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    if (searchQuery) {
      const filtered = restaurants.filter((restaurant) =>
        restaurant.restaurant_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    } else {
      setFilteredRestaurants([]);
    }
  };

  const handleSelectRestaurant = (restaurantId: string) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Pesquisar restaurantes..."
        value={query}
        onChange={handleInputChange}
        className={styles.searchInput}
      />
      {filteredRestaurants.length > 0 && (
        <ul className={styles.suggestionsList}>
          {filteredRestaurants.map((restaurant) => (
            <li
              key={restaurant.id}
              onClick={() => handleSelectRestaurant(restaurant.id)}
              className={styles.suggestionItem}
            >
              {restaurant.restaurant_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
