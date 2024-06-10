import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const categoryGetAllJson = async (req: Request, res: Response): Promise<void> => {
  try {
    const filePath = path.resolve('./src/samples/category.json');
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
    const filePath = path.resolve('./src/samples/category.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    const newCategoryId = data.categorias.length ? data.categorias[data.categorias.length - 1].id + 1 : 1;////////////////////////////

    const newCategory = {
      id: newCategoryId,
      nome: req.body.nome,/////////////////////////////
      itens: req.body.itens || []//////////////////////////////
    };

    data.categorias.push(newCategory);///////////////////////////

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

export const categoryUpdateJson = async (req: Request, res: Response): Promise<void> => {
  try {
    const filePath = path.resolve('./src/samples/category.json');
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
    const filePath = path.resolve('./src/samples/category.json');
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
    