import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import RestaurantHeader from "../../../../shared/components/RestaurantHeader/index";
import { useParams, useNavigate } from "react-router-dom";
import MenuPage from "../MenuEditor/MenuPage";
import { addUserOrder } from "../../../../shared/services/userService"; // Importa a função de serviço
import { User } from "../../../../shared/types/User"; // Importa o tipo de usuário
import { localContextGetInfo } from "../../context/LocalContext";
import axios from "axios";

const Index = () => {
  const { restaurant_id } = useParams<{ restaurant_id: string | undefined }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null); // Usuário atual
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localContextGetInfo("user", "id"); // Função para obter o ID do usuário
        if (userId !== "") {
          const response = await axios.get(`http://localhost:5001/users/${userId}`);
          console.log("User data fetched:", response.data);
          setUser(response.data);
        } else {
          setError("Nenhum usuário logado encontrado");
        }
      } catch (e) {
        setError("Falha ao carregar os dados do usuário");
        console.error("Erro ao buscar os dados do usuário:", e);
      }
    };

    fetchUserData();
  }, []);

  const handleOnClickItem = async (item_id: string) => {
    if (!user) {
      setError("Usuário não encontrado");
      return;
    }

    try {
      const newOrder = await addUserOrder(user.id, item_id);
      console.log("Pedido adicionado:", newOrder);
    } catch (error) {
      console.error("Erro ao adicionar pedido:", error);
      setError("Erro ao adicionar pedido");
    }
  };

  if (!restaurant_id) {
    return <div className={styles.restaurantPage}>Restaurant not found</div>;
  }

  return (
    <div className={styles.restaurantPage}>
      <RestaurantHeader restaurantId={restaurant_id} />
      <p className={styles.descriptionText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
      <div className={styles.menuHeader}>
        <h1>Menu</h1>
      </div>
      <div>
        <MenuPage restaurantId={restaurant_id} onClickItem={handleOnClickItem}></MenuPage>
      </div>
    </div>
  );
};

export default Index;
