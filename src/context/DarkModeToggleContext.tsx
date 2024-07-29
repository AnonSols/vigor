import { createContext, ReactNode, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

type createContextProp = {
  isDarkMode: boolean;
  setDarkMode: React.Dispatch<boolean>;
  handleToggle: () => void;
};
const DarkModeContext = createContext<createContextProp | null>(null);

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const { value: isDarkMode, setValue: setDarkMode } = useLocalStorageState(
    false,
    "dark-mode"
  );

  function handleToggle() {
    setDarkMode((t) => !t);
  }
  return (
    <DarkModeContext.Provider value={{ isDarkMode, setDarkMode, handleToggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkModeToggle() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error("Context was used outside a provider");

  return context;
}
