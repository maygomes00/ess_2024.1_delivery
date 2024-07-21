import styles from "./index.module.css";

type CategoryBlockProps = {
  categoryName: string;
};

const CategoryBlock = ({ categoryName }: CategoryBlockProps) => {
  console.log("Nome da categoria:", categoryName); // Adicione esta linha
  return (
    <div className={styles.categoryBox}>
      <div className={styles.categoryInfo}>
        <div className={styles.categoryName}>
          <p>{categoryName}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryBlock;
