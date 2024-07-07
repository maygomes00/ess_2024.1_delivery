import styles from "./index.module.css";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { Link } from "react-router-dom";
import PageSelector from "../../../../shared/components/PageSelector";
import PageBlock from "../../../../shared/components/PageBlock";
import CreateTest from "../CreateTest";
import ListTests from "../ListTests";

const ItemPage = () => {
  const userContext = useContext(MainContext).user
  const [id, setId] = userContext.id

  return (
    <section className={styles.container}>
      <PageSelector line_thickness={2} line_color="Red">
        <button> AAAAA </button>
        <button> BBBBB </button>
        <button> CCCCC </button>
      </PageSelector>
      <PageBlock
        elements={[CreateTest(), ListTests()]} 
        index={0}
        border={1}
      />
    </section>
  );
};

export default ItemPage;
