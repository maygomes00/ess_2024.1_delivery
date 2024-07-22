import styles from './index.module.css';
import { Category } from '../../../../../../shared/types/category';

type CategoryCardProps = {
  category: Category;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className={styles.categoryCard}>
      <div className={styles.categoryHeader}>
        <h2>{category.name}</h2>
      </div>
    </div>
  );
};

export default CategoryCard;
