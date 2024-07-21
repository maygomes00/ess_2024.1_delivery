export interface User {
    id: string;
    nome: string;
    email: string;
    password: string;
    telefone: string;
    endereco: string;
    pedidos: Pedido[];
}

interface Pedido {
    order_id: number;
    data: string;
    itens: Item[];
    total: number;
}

interface Item {
    produto_id: number;
    name: string;
    quantity: number;
    price: number;
}
