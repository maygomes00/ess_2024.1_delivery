import styles from "./index.module.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CreateTest = () => {
  const [teste, setTeste] = useState("")

  const funcTest = (valor) => {
    localStorage.setItem("teste", valor)
    setTeste(valor)
  }

  useEffect(() => {
  }, [teste])

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Crie um test</h1>
      <button onClick={() => {funcTest("Testando 123")}}>AAAAAA</button>
      <p>{localStorage.getItem("teste")}</p>
      <Link to="/tests">AAAAAAAA2</Link>
    </section>
  );
};

export default CreateTest;
