import { ReactNode } from "react";
import { MainProvider } from "./app/home/context/MainContext";

const Provider = ({ children }: { children: ReactNode }) => {
  return <MainProvider>{children}</MainProvider>;
};

export default Provider;
