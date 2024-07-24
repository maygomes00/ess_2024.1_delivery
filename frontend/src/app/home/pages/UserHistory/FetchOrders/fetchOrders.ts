import { getUserOrders } from "../../../../../shared/services/userService";
import { getItemDetails } from "../../../../../shared/services/ItensService";
import { Pedido } from "../../../../../shared/types/User";
import { Item } from "../../../../../shared/types/Item";

export const fetchOrders = async (
  user_id: string,
  setOrders: React.Dispatch<React.SetStateAction<Pedido[]>>,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setItems: React.Dispatch<React.SetStateAction<{ [key: string]: Item }>>
) => {
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
    const itemPromises = orders.flatMap((order) => order.itens.map((userItem) => getItemDetails(userItem.produto_id)));
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
