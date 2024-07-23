import React from "react";
import styles from "./index.module.css";

interface PeriodSelectorProps {
  setPeriodo: (periodo: string) => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ setPeriodo }) => {
  return (
    <div className={styles.buttonsBox}>
      <button className={styles.button} onClick={() => setPeriodo("mensal")} data-cy="mensal">
        Mensal
      </button>
      <button className={styles.button} onClick={() => setPeriodo("diario")} data-cy="diario">
        Diário
      </button>
    </div>
  );
};

export default PeriodSelector;
