// app/context/PlanContext.js
import { createContext, useContext, useState } from "react";

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [planName, setPlanName] = useState(null);

  return (
    <PlanContext.Provider value={{ planName, setPlanName }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);
