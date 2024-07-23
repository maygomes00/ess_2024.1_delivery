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
  total: number;
}

export interface UserItem {
  produto_id: string;
  quantity: number;
}

export interface EstatisticaMensal {
  mes: string;
  totalGasto: number;
  numeroItens: number;
}

export interface EstatisticaDiaria {
  dia: string;
  totalGasto: number;
  numeroItens: number;
}
