import CategoryEntity from '../entities/category.entity';
import BaseRepository from './base.repository';

class CategoryRepository extends BaseRepository<CategoryEntity> {
  constructor() {
    super('tests');
  }

  public async getTests(): Promise<CategoryEntity[]> {
    return await this.findAll();
  }

  public async getTest(id: string): Promise<CategoryEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createTest(data: CategoryEntity): Promise<CategoryEntity> {
    return await this.add(data);
  }

  public async updateTest(id: string, data: CategoryEntity): Promise<CategoryEntity | null> {
    return await this.update((item) => item.id === id, data);
  }
  
  public async deleteTest(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default CategoryRepository;
