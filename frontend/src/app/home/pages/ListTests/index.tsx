import { useContext } from "react";
import styles from "./index.module.css";
import { MainContext } from "../../context/MainContext";
import { Link } from "react-router-dom";

const ListTests = () => {
  const [id, setId] = useContext(MainContext).user.id

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>List Tests</h1>
      <p>{id}</p>
      <Link to="/create-test" replace>
        CRIAR TEST
      </Link>
    </section>
  );
};

export default ListTests;
