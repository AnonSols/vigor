import { HiOutlineMoon } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkModeToggle } from "../context/DarkModeToggleContext";
import { useEffect } from "react";

const DarkModeToggle = () => {
  const { isDarkMode, handleToggle } = useDarkModeToggle();

  useEffect(() => {
    if (isDarkMode) {
      document.cLA;
    }
  }, [isDarkMode]);
  return (
    <ButtonIcon onClick={handleToggle}>
      <HiOutlineMoon />
    </ButtonIcon>
  );
};

export default DarkModeToggle;
