import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // Importa a função uuidv4 para gerar IDs únicos


interface Categoria {
  id: string;
  nome: string;
  restauranteId: string;
  temItens: boolean;
}

export const categoryGetAllJson = async (req: Request, res: Response): Promise<void> => {
  try {
    const filePath = path.resolve('./src/data/categories/categories.json');
    if (!fs.existsSync(filePath)) {
      console.error("File not found:", filePath);
      res.status(404).json({ error: "File not found" });
      return;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    if (!data) {
      console.log('Empty category');
    }
    
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
        console.error("Error in getAll:", error.message);
      } else {
        console.error("Unknown error in getAll");
      }
      res.status(500).json({
        error: "Internal Server Error"
    });
  }
};

export const categoryAddJson = async (req: Request, res: Response): Promise<void> => {
  try {
    const nomeCategoria = req.body.nome?.trim(); // Obtém o nome da categoria e remove espaços em branco

    if (!nomeCategoria || nomeCategoria.length === 0) {
      res.status(400).json({ error: "O nome da categoria não pode estar em branco" });
      return;
    }

    const filePath = path.resolve('./src/data/categories/categories.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data: { categorias: Categoria[] } = JSON.parse(fileContent);

    // Verifica se já existe uma categoria com o mesmo nome
    const existingCategory = data.categorias.find(categoria => categoria.nome === nomeCategoria);
    if (existingCategory) {
      res.status(400).json({ error: "Já existe uma categoria com esse nome" });
      return;
    }

    // Obtém o ID do restaurante (exemplo: pode ser obtido do req.user ou de outra fonte de autenticação)
    const restauranteId = 'restaurante-1'; // Exemplo: ID fixo para ilustração

    // Cria a nova categoria
    const newCategory: Categoria = {
      id: uuidv4().substring(0, 10), // Gera um ID único de 10 caracteres
      nome: nomeCategoria,
      restauranteId,
      temItens: false // Inicia como false, pois é uma nova categoria
    };

    // Adiciona a nova categoria ao array de categorias
    data.categorias.push(newCategory);

    // Escreve os dados atualizados de volta no arquivo JSON
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

    res.status(201).json(newCategory);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in getAll:", error.message);
    } else {
      console.error("Unknown error in getAll");
    }
    res.status(500).json({
      error: "Internal Server Error"
  });
  }
};

// Função para gerar um ID aleatório de 10 dígitos
const generateCategoryId = (): string => {
  const id = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  return id;
};

// Função fictícia para obter o ID do restaurante (substitua com sua lógica real)
const getRestauranteId = (): string => {
  return "RESTAURANTE_ID_AQUI"; // Substitua pelo ID do seu restaurante real
};

export const categoryUpdateJson = async (req: Request, res: Response): Promise<void> => {
  try {
    const filePath = path.resolve('./src/data/categories/categories.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    const categoryId = parseInt(req.params.id, 10);
    const categoryIndex = data.categorias.findIndex((category: { id: number }) => category.id === categoryId);//////////////////

    if (categoryIndex === -1) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    // Atualiza apenas o nome da categoria
    data.categorias[categoryIndex].nome = req.body.nome;/////////////////////

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

    res.status(200).json(data.categorias[categoryIndex]);///////////////////////////////
  } catch (error) {
    if (error instanceof Error) {
        console.error("Error in getAll:", error.message);
      } else {
        console.error("Unknown error in getAll");
      }
      res.status(500).json({
        error: "Internal Server Error"
    });
  }
};

export const categoryDeleteJson = async(req: Request, res: Response): Promise<void> => {
  try {
    const filePath = path.resolve('./src/data/categories/categories.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    let data = JSON.parse(fileContent);

    console.log("Data read from JSON:", data);
    console.log("Request params:", req.params);

    // Captura e converte o ID da categoria a ser deletada a partir dos parâmetros da requisição
    const categoryId = parseInt(req.params.id, 10);
    console.log("Category ID from request:", categoryId);

    if (isNaN(categoryId)) {
      console.error("Invalid category ID:", req.params.id);
      res.status(400).json({ error: "Invalid category ID" });
      return;
    }

    // Verifica se a categoria existe no arquivo JSON
    const categoryIndex = data.categorias.findIndex((category: { id: number }) => category.id === categoryId);//////////////////

    if (categoryIndex === -1) {
      console.error("Category not found with ID:", categoryId);
      res.status(404).json({ error: "Category not found" });
      return;
    }

    // Remove a categoria do array de categorias
    data.categorias = data.categorias.filter((category: { id: number }) => category.id !== categoryId);///////////////////////

    // Escreve os dados atualizados de volta no arquivo JSON
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

    res.status(200).json(data.categorias);////////////////////////////////
  } catch (error) {
    if (error instanceof Error) {
        console.error("Error in getAll:", error.message);
      } else {
        console.error("Unknown error in getAll");
      }
      res.status(500).json({
        error: "Internal Server Error"
    });
  }
};
    