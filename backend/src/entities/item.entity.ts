import BaseEntity from './base.entity';

export default class ItemEntity extends BaseEntity {
    restaurant_id: string
    name: string
    price: string
    description: string
    categories: string

  constructor(data: ItemEntity) {
    super(data.id || '')
    this.restaurant_id = data.restaurant_id
    this.name = data.name
    this.price = data.price
    this.description = data.description
    this.categories = data.categories
  }
}