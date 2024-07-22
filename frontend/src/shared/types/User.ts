export interface User {
  id: string;
  nome: string;
  email: string;
  password: string;
  telefone: string;
  endereco: string;
  pedidos: Pedido[];
}

export interface Pedido {
  order_id: number;
  data: string;
  itens: UserItem[];
}

export interface UserItem {
  produto_id: string;
  quantity: number;
}
