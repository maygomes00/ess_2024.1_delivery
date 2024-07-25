import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatDate = (dateString: string) => {
  let date: Date;

  // Check if the date is in the format "dd/MM/yyyy"
  if (dateString.includes("/")) {
    // Parse the date correctly
    date = parse(dateString, "dd/MM/yyyy", new Date());
  } else {
    // Assume the date is in the format "yyyy-MM-dd"
    date = parse(dateString, "yyyy-MM-dd", new Date());
  }

  const formattedDate = format(date, "EEE dd MMMM yyyy", { locale: ptBR });
  return capitalizeFirstLetter(formattedDate);
};

export { formatDate, capitalizeFirstLetter };
