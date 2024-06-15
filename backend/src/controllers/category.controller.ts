import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // Importa a função uuidv4 para gerar IDs únicos

interface Category {
  id: string;
  nome: string;
  restauranteId: string;
  temItens: boolean;
}

interface Item {
  id: string;
  restaurant_id: string;
  name: string;
  price: string;
  description: string;
  categories: string;
  image: string;
}

// Caminhos dos arquivos JSON
const categoryFilePath = path.resolve('./src/data/categories/categories.json');
const itemFilePath = path.resolve('./src/data/itens/itens.json');

// Função para ler e analisar JSON de um arquivo
const readJsonFile = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
};

// Função para escrever JSON em um arquivo
const writeJsonFile = (filePath: string, data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Função utilitária para lidar com erros
const handleError = (error: unknown, res: Response, message: string) => {
  if (error instanceof Error) {
    console.error(message, error.message);
  } else {
    console.error("Erro desconhecido:", message);
  }
  res.status(500).json({
    error: "Erro interno do servidor"
  });
};

export const categoryGetAllJson = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!fs.existsSync(categoryFilePath)) {
      console.error("File not found:", categoryFilePath);
      res.status(404).json({ error: "File not found" });
      return;
    }

    const data = readJsonFile(categoryFilePath);

    if (!data) {
      console.log('Categoria vazia!');
    }

    res.status(200).json(data);
  } catch (error) {
    handleError(error, res, "Erro em categoryGetAllJson:");
  }
};

export const categoryGetById = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryId = req.params.id;
    const data: { categorias: Category[] } = readJsonFile(categoryFilePath);

    const category = data.categorias.find(category => category.id === categoryId);

    if (!category) {
      res.status(404).json({ error: "Categoria não encontrada!" });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    handleError(error, res, "Erro em categoryGetById:");
  }
};

export const categoryAddJson = async (req: Request, res: Response): Promise<void> => {
  try {
    const nomeCategory = req.body.nome?.trim(); // Obtém o nome da category e remove espaços em branco

    if (!nomeCategory || nomeCategory.length === 0) {
      res.status(400).json({ error: "É obrigatório um nome para a categoria!" });
      return;
    }

    const data: { categorias: Category[] } = readJsonFile(categoryFilePath);

    // Verifica se já existe uma category com o mesmo nome
    const existingCategory = data.categorias.find(category => category.nome === nomeCategory);
    if (existingCategory) {
      res.status(400).json({ error: "Já existe uma category com esse nome!" });
      return;
    }

    // Obtém o ID do restaurante (exemplo: pode ser obtido do req.user ou de outra fonte de autenticação)
    const restauranteId = 'restaurante-1'; // Exemplo: ID fixo para ilustração

    // Cria a nova category
    const newCategory: Category = {
      id: uuidv4().substring(0, 10), // Gera um ID único de 10 caracteres
      nome: nomeCategory,
      restauranteId,
      temItens: false // Inicia como false, pois é uma nova category
    };

    // Adiciona a nova category ao array de categorias
    data.categorias.push(newCategory);

    // Escreve os dados atualizados de volta no arquivo JSON
    writeJsonFile(categoryFilePath, data);

    res.status(201).json(newCategory);
  } catch (error) {
    handleError(error, res, "Erro em categoryAddJson:");
  }
};

export const categoryUpdateJson = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: { categorias: Category[] } = readJsonFile(categoryFilePath);

    const categoryId = req.params.id;
    const newName = req.body.nome;

    if (!newName || newName.trim().length === 0) {
      res.status(400).json({ error: "Nome da categoria não pode ser vazio!" });
      return;
    }

    const categoryIndex = data.categorias.findIndex((category) => category.id === categoryId);

    if (categoryIndex === -1) {
      res.status(404).json({ error: "Categoria não encontrada!" });
      return;
    }

    const nameExists = data.categorias.some((category) => category.nome.toLowerCase() === newName.toLowerCase() && category.id !== categoryId);

    if (nameExists) {
      res.status(400).json({ error: "Já existe uma categoria com esse nome!" });
      return;
    }

    // Atualiza apenas o nome da categoria
    data.categorias[categoryIndex].nome = newName;

    writeJsonFile(categoryFilePath, data);

    res.status(200).json(data.categorias[categoryIndex]);
  } catch (error) {
    handleError(error, res, "Erro em categoryUpdateJson:");
  }
};

export const categoryDeleteJson = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!fs.existsSync(categoryFilePath)) {
      console.error("Category file not found:", categoryFilePath);
      res.status(404).json({ error: "Categoria não encontrada!" });
      return;
    }

    if (!fs.existsSync(itemFilePath)) {
      console.error("Item file not found:", itemFilePath);
      res.status(404).json({ error: "Item file not found" });
      return;
    }

    let categoryData: { categorias: Category[] };
    let itemData: { itens: Item[] };

    try {
      categoryData = readJsonFile(categoryFilePath);
      itemData = readJsonFile(itemFilePath);
    } catch (error) {
      handleError(error, res, "Erro lendo arquivos:");
      return;
    }

    const categoryId = req.params.id;

    if (!categoryId) {
      console.error("Invalid category ID:", req.params.id);
      res.status(400).json({ error: "Categoria não encontrada!" });
      return;
    }

    const categoryIndex = categoryData.categorias.findIndex(category => category.id === categoryId);

    if (categoryIndex === -1) {
      console.error("Category not found with ID:", categoryId);
      res.status(404).json({ error: "Categoria não encontrada!" });
      return;
    }

    const categoryName = categoryData.categorias[categoryIndex].nome;

    const hasItems = itemData.itens.some(item => item.categories === categoryName);

    if (hasItems) {
      console.error("Cannot delete category with associated items:", categoryName);
      res.status(400).json({ error: "Categoria com itens! Não pode ser deletada!" });
      return;
    }

    categoryData.categorias = categoryData.categorias.filter(category => category.id !== categoryId);

    try {
      writeJsonFile(categoryFilePath, categoryData);
      console.log("Categoria deletada com sucesso!");
      res.status(200).json(categoryData.categorias);
    } catch (error) {
      handleError(error, res, "Erro escrevendo no arquivo:");
    }
  } catch (error) {
    handleError(error, res, "Erro em categoryDeleteJson:");
  }
};
