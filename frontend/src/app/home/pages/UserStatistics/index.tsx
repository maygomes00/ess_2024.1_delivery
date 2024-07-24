import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import { getUserOrders } from "../../../../shared/services/userService";
import { EstatisticaDiaria, EstatisticaMensal } from "../../../../shared/types/User";
import NoOrdersModal from "../../../../shared/components/NoOrdersModal/NoOrdersModal";
import { calculateStatistcs } from "../../../../shared/utils/calculateStatistcs";
import StatisticsList from "./StatisticsList";
import PeriodSelector from "./PeriodSelector";

const UserStatistics = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const [error, setError] = useState<string | null>(null);
  const [periodo, setPeriodo] = useState<string>("mensal");
  const [estatisticasMensais, setEstatisticasMensais] = useState<EstatisticaMensal[]>([]);
  const [estatisticasDiarias, setEstatisticasDiarias] = useState<EstatisticaDiaria[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user_id) {
        setError("User ID não encontrado");
        return;
      }

      try {
        const orders = await getUserOrders(user_id);
        if (orders.length === 0) {
          setShowModal(true);
          return;
        }
        calculateStatistcs(orders, setEstatisticasMensais, setEstatisticasDiarias);
      } catch (error) {
        setError("Erro ao pegar histórico de pedidos do usuário");
      }
    };

    fetchOrders();
  }, [user_id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (showModal) {
    return <NoOrdersModal show={showModal} handleClose={handleCloseModal} />;
  }

  return (
    <div className={styles.statisticsPage}>
      <h1 className={styles.title}>Estatísticas de Pedidos</h1>
      <PeriodSelector setPeriodo={setPeriodo} />
      <StatisticsList
        periodo={periodo}
        estatisticasMensais={estatisticasMensais}
        estatisticasDiarias={estatisticasDiarias}
      />
    </div>
  );
};

export default UserStatistics;
