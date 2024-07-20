export type Item = {
    id: string;
    restaurant_id: string; 
    name: string; 
    price: string;
    description: string;
    categories: string;
    image64: string;
}

export type Category = {
    id: string;
    name: string;
    restauranteId: string;
    temItens: boolean;
  };