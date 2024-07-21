import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import styles from "./index.module.css";
import { getUserOrders } from "../../../../shared/services/userService";
import { Pedido } from "../../../../shared/types/User";

interface EstatisticaMensal {
  mes: string;
  totalGasto: number;
  numeroItens: number;
}

interface EstatisticaDiaria {
  dia: string;
  totalGasto: number;
  numeroItens: number;
}

const UserStatistics = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const [orders, setOrders] = useState<Pedido[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [periodo, setPeriodo] = useState<string>("mensal");
  const [estatisticasMensais, setEstatisticasMensais] = useState<
    EstatisticaMensal[]
  >([]);
  const [estatisticasDiarias, setEstatisticasDiarias] = useState<
    EstatisticaDiaria[]
  >([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user_id) {
        setError("User ID não encontrado");
        return;
      }

      try {
        const orders = await getUserOrders(user_id);
        setOrders(orders);
        calcularEstatisticas(orders);
      } catch (error) {
        setError("Erro ao pegar histórico de pedidos do usuário");
      }
    };

    fetchOrders();
  }, [user_id]);

  const calcularEstatisticas = (orders: Pedido[]) => {
    const estatMensais: { [key: string]: EstatisticaMensal } = {};
    const estatDiarias: { [key: string]: EstatisticaDiaria } = {};

    orders.forEach((order) => {
      const mes = format(new Date(order.data), "MMMM yyyy", { locale: ptBR });
      const dia = format(new Date(order.data), "dd/MM/yyyy", { locale: ptBR });

      // Estatísticas Mensais
      if (!estatMensais[mes]) {
        estatMensais[mes] = { mes, totalGasto: 0, numeroItens: 0 };
      }
      estatMensais[mes].totalGasto += order.total;
      estatMensais[mes].numeroItens += order.itens.length;

      // Estatísticas Diárias
      if (!estatDiarias[dia]) {
        estatDiarias[dia] = { dia, totalGasto: 0, numeroItens: 0 };
      }
      estatDiarias[dia].totalGasto += order.total;
      estatDiarias[dia].numeroItens += order.itens.length;
    });

    setEstatisticasMensais(Object.values(estatMensais));
    setEstatisticasDiarias(Object.values(estatDiarias));
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatDate = (date: string) => {
    const parsedDate = new Date(date.split("/").reverse().join("-"));
    return capitalizeFirstLetter(
      format(parsedDate, "EEE dd MMMM yyyy", { locale: ptBR })
    );
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.statisticsPage}>
      <h1 className={styles.title}>Estatísticas de Pedidos</h1>
      <div className={styles.buttonsBox}>
        <button className={styles.button} onClick={() => setPeriodo("mensal")}>
          Mensal
        </button>
        <button className={styles.button} onClick={() => setPeriodo("diario")}>
          Diário
        </button>
      </div>
      {periodo === "mensal" && (
        <div className={styles.content}>
          <h2 className={styles.detailsTitle}>Detalhes Mensais</h2>
          <ul className={styles.list}>
            {estatisticasMensais.map((estat) => (
              <div className={styles.statistics}>
                <p>{capitalizeFirstLetter(estat.mes)}</p>
                <li className={styles.detailsInfo} key={estat.mes}>
                  Gastos Totais: {estat.totalGasto.toFixed(2)}, Número de Itens:{" "}
                  {estat.numeroItens}
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
              <div className={styles.statistics}>
                <p>{formatDate(estat.dia)}</p>
                <li className={styles.detailsInfo} key={estat.dia}>
                  Gastos Totais: {estat.totalGasto.toFixed(2)}, Número de Itens:{" "}
                  {estat.numeroItens}
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserStatistics;
