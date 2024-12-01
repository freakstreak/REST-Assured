"use client";

import { createContext, useContext, useState } from "react";

interface ApplicationContextType {
  loadingFeatures: boolean;
  setLoadingFeatures: (loading: boolean) => void;
  loadingSchema: boolean;
  setLoadingSchema: (loading: boolean) => void;
  loadingEndpoints: boolean;
  setLoadingEndpoints: (loading: boolean) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error(
      "useApplicationContext must be used within an ApplicationProvider"
    );
  }
  return context;
};

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loadingFeatures, setLoadingFeatures] = useState(false);
  const [loadingSchema, setLoadingSchema] = useState(false);
  const [loadingEndpoints, setLoadingEndpoints] = useState(false);

  return (
    <ApplicationContext.Provider
      value={{
        loadingFeatures,
        setLoadingFeatures,
        loadingSchema,
        setLoadingSchema,
        loadingEndpoints,
        setLoadingEndpoints,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
