// src/types.ts

export type Item = {
    id: string;
    restauranteId: string;
    nome: string;
    preco: string;
    descricao: string;
    categorias: string[];
    imagem: string;
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
  