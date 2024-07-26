// import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { ReactNode } from "react";
import ButtonIcon from "./ButtonIcon";

const HeaderTab = ({
  onClick,
  isLoading,
  icon,
  spinner,
}: {
  onClick?: () => void;
  isLoading?: boolean | false;
  icon?: ReactNode;
  spinner?: ReactNode;
}) => {
  return (
    <ButtonIcon onClick={onClick} disabled={isLoading}>
      {" "}
      {!isLoading ? icon : spinner}{" "}
    </ButtonIcon>
  );
};

export default HeaderTab;
