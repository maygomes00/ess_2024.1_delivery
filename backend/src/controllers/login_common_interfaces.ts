export interface User {
  id: string;
  email: string;
  password: string;
}

export interface Restaurant {
  id: string;
  email: string;
  password: string;
  owner_name: string;
  owner_cpf: string;
  owner_address: string;
  owner_telephone: string;
  restaurant_name: string;
  restaurant_cnpj: string;
  restaurant_address: string;
  restaurant_telephone: string;
  items: any[];
}
