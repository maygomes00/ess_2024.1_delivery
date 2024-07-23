export type Item = {
  id: string;
  active: string;
  restaurantId: string; 
  nome: string; 
  preco: string;
  descricao: string;
  categorias: string;
  image: string;
};

export type ItemData = {
  itens: Item[];
};

export type Category = {
  id: string;
  nome: string;
};

export type CategoryData = {
  categorias: Category[];
};
