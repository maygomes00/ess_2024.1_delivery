import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Pedido, EstatisticaMensal, EstatisticaDiaria } from "../types/User";

export const calculateStatistcs = (
  orders: Pedido[],
  setEstatisticasMensais: React.Dispatch<
    React.SetStateAction<EstatisticaMensal[]>
  >,
  setEstatisticasDiarias: React.Dispatch<
    React.SetStateAction<EstatisticaDiaria[]>
  >
) => {
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
