import { ReactNode, useEffect, useState } from "react";
import { localContextStart } from "./app/home/context/LocalContext";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <div>
        {children}
    </div>
  );
};

export default Provider;
