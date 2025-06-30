import { createContext } from "react";
type ActiveIdContextType = {
  activeId: number | null;
};
export const ActiveIdContext = createContext<ActiveIdContextType | null>(null);
