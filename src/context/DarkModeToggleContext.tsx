import {
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

type createContextProp = {
  isDarkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleToggle: (e: FormEvent) => void;
};
const DarkModeContext = createContext<createContextProp | undefined>(undefined);

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setDarkMode] = useLocalStorageState(false, "dark-mode");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);
  function handleToggle(e: FormEvent) {
    e.preventDefault();
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
