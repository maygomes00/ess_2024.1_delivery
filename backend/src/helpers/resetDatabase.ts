import fs from 'fs';
import path from 'path';

export const resetDatabase = async () => {
  // Caminhos dos arquivos JSON de categorias e itens
  const categoryFilePath = path.resolve('./src/data/categories/categories.json');
  const itemFilePath = path.resolve('./src/data/itens/itens.json');

  // Dados iniciais para categorias e itens
  const initialCategories = {
    categorias: []
  };
  const initialItems = {
    itens: []
  };

  // Escreve os dados iniciais nos arquivos JSON
  fs.writeFileSync(categoryFilePath, JSON.stringify(initialCategories, null, 2), 'utf-8');
  fs.writeFileSync(itemFilePath, JSON.stringify(initialItems, null, 2), 'utf-8');
};

export default resetDatabase;