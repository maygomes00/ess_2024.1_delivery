import styles from "./index.module.css";

/*
  Campo de seleção, pode receber elementos para cerem selecionados e a linha de separação em baixo
  ajusta seu tamanho dinamicamente.
*/
const PageSelector = ({children}) => {

  return (
    <section className={styles.PageSelector}>
      <div className={styles.buttonContainer}>
        { children }
      </div>
      <div className={styles.linha}/>
    </section>
  );
};

export default PageSelector;
