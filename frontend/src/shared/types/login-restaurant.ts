export interface Restaurant {
    id: string;
    nome: string;
    email: string;
    password: string;
    endereco: string;
  }
  
  export interface RestaurantLoginState {
    user: Restaurant | null;
  }
  
  export type RestaurantAuthAction =
    | { type: 'LOGIN'; payload: Restaurant }
    | { type: 'LOGOUT' };
  