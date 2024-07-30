import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkModeToggle } from "../context/DarkModeToggleContext";

const DarkModeToggle = () => {
  const { isDarkMode, handleToggle } = useDarkModeToggle();

  return (
    <ButtonIcon onClick={handleToggle}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
};

export default DarkModeToggle;
