import styles from "./index.module.css";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { Link } from "react-router-dom";

const CreateTest = () => {
  const userContext = useContext(MainContext).user
  const [id, setId] = userContext.id

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Crie um test</h1>
      <button onClick={() => setId("12345")}>AAAAAA</button>
      <p>{id}</p>
      <Link to="/tests">AAAAAAAA2</Link>
    </section>
  );
};

export default CreateTest;
