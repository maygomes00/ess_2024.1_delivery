import styles from "../../MenuEditor.module.css"
import { Category } from '../../../../../../shared/types/category';

type CategoryCardProps = {
  category: Category;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className={styles.CategoryCard}>
      <div className={styles.CategoryCardHeader}>
        <h2>{category.name}</h2>
      </div>
    </div>
  );
};

export default CategoryCard;
