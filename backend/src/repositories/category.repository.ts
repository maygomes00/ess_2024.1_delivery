import { Item } from '../types/types';
import CategoryEntity from '../entities/category.entity';
import BaseRepository from './base.repository';

// Variável in-memory para armazenar categorias durante os testes
export const inMemoryCategory: CategoryEntity[] = [];

class CategoryRepository extends BaseRepository<CategoryEntity> {
  criarItem(item: Item) {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super('tests');
  }

  // Função para obter todas as categorias
  public async getTests(): Promise<CategoryEntity[]> {
    return inMemoryCategory;
  }

  // Função para obter uma categoria pelo ID
  public async getTest(id: string): Promise<CategoryEntity | null> {
    return inMemoryCategory.find((item) => item.id === id) || null;
  }

  // Função para criar uma nova categoria
  public async createTest(data: CategoryEntity): Promise<CategoryEntity> {
    inMemoryCategory.push(data);
    return data;
  }

  // Função para atualizar uma categoria pelo ID
  public async updateTest(id: string, data: CategoryEntity): Promise<CategoryEntity | null> {
    const index = inMemoryCategory.findIndex((item) => item.id === id);
    if (index !== -1) {
      inMemoryCategory[index] = data;
      return data;
    }
    return null;
  }
  
  // Função para deletar uma categoria pelo ID
  public async deleteTest(id: string): Promise<void> {
    const index = inMemoryCategory.findIndex((item) => item.id === id);
    if (index !== -1) {
      inMemoryCategory.splice(index, 1);
    }
  }

  // Função para criar uma categoria (igual a createTest)
  public async criarCategoria(categoria: CategoryEntity): Promise<CategoryEntity> {
    inMemoryCategory.push(categoria);
    return categoria;
  }

  // Função para obter uma categoria pelo ID (igual a getTest)
  public async obterCategoria(id: string): Promise<CategoryEntity | null> {
    return inMemoryCategory.find((item) => item.id === id) || null;
  }
}

export default CategoryRepository;
