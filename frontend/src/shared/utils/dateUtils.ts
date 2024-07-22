import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = format(date, "EEE dd MMMM yyyy", { locale: ptBR });
  return capitalizeFirstLetter(formattedDate);
};
