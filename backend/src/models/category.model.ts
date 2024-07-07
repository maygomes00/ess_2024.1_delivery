// category.model.ts
import BaseModel from './base.model';

export default class CategoryModel extends BaseModel {
  name: string; // Use 'name' aqui conforme a primeira definição
  restauranteId: string;
  temItens: boolean;

  constructor(data: { id: string; name: string; restauranteId: string; temItens: boolean }) {
    super(data.id);
    this.name = data.name;
    this.restauranteId = data.restauranteId;
    this.temItens = data.temItens;
  }
}
