'use client';

import { createContext, useContext, useState, ReactNode } from "react";

// tipo do contexto
type ViewMode = "grid" | "list";

interface ViewModeContextProps {
  viewMode: ViewMode;
  toggleViewMode: () => void;
}

// cria o contexto
const ViewModeContext = createContext<ViewModeContextProps | undefined>(undefined);

// provider
export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const toggleViewMode = () =>
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));

  return (
    <ViewModeContext.Provider value={{ viewMode, toggleViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

// hook para consumir
export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error("useViewMode deve ser usado dentro de ViewModeProvider");
  }
  return context;
}