import React, { useState } from 'react';
import styles from './index.module.css';

type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
};

type Category = {
  id: string;
  name: string;
  items: Item[];
};

type CategoryCardProps = {
  category: Category;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.categoryCard}>
      <div className={styles.categoryHeader} onClick={handleToggle}>
        <h2>{category.name}</h2>
        <button className={styles.toggleButton}>
          {isOpen ? '▲' : '▼'}
        </button>
      </div>
      {isOpen && (
        <div className={styles.itemList}>
          {category.items.map(item => (
            <div key={item.id} className={styles.item}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>R${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
