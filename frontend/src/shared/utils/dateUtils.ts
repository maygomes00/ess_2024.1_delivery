import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatDate = (dateString: string) => {
  let date: Date;

  // Check if the date is in the format "dd/MM/yyyy"
  if (dateString.includes("/")) {
    date = new Date(dateString.split("/").reverse().join("-"));
  } else {
    // Assume the date is in the format "yyyy-MM-dd"
    date = new Date(dateString);
  }

  const formattedDate = format(date, "EEE dd MMMM yyyy", { locale: ptBR });
  return capitalizeFirstLetter(formattedDate);
};

export { formatDate, capitalizeFirstLetter };
