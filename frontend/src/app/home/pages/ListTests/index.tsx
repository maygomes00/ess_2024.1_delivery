import { useContext } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

const ListTests = () => {

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>List Tests</h1>
      <p>{localStorage.getItem("teste")}</p>
      <Link to="/create-test" replace>
        CRIAR TEST
      </Link>
    </section>
  );
};

export default ListTests;
