import React from "react";
import { EstatisticaMensal, EstatisticaDiaria } from "../../../../../shared/types/User";
import { formatDate, capitalizeFirstLetter } from "../../../../../shared/utils/dateUtils";
import styles from "./index.module.css";

interface EstatisticasListProps {
  periodo: string;
  estatisticasMensais: EstatisticaMensal[];
  estatisticasDiarias: EstatisticaDiaria[];
}

const EstatisticasList: React.FC<EstatisticasListProps> = ({ periodo, estatisticasMensais, estatisticasDiarias }) => {
  return (
    <>
      {periodo === "mensal" && (
        <div>
          <h2 className={styles.detailsTitle}>Detalhes Mensais</h2>
          <ul className={styles.list}>
            {estatisticasMensais.map((estat) => (
              <div key={estat.mes}>
                <p>{capitalizeFirstLetter(estat.mes)}</p>
                <li className={styles.detailsInfoBox}>
                  Gastos Totais: {estat.totalGasto.toFixed(2)}, Número de Itens: {estat.numeroItens}
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
      {periodo === "diario" && (
        <div>
          <h2 className={styles.detailsTitle}>Detalhes Diários</h2>
          <ul className={styles.list}>
            {estatisticasDiarias.map((estat) => (
              <div key={estat.dia}>
                <p>{formatDate(estat.dia)}</p>
                <li className={styles.detailsInfoBox}>
                  Gastos Totais: {estat.totalGasto.toFixed(2)}, Número de Itens: {estat.numeroItens}
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default EstatisticasList;
