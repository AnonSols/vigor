import ButtonIcon from "../../ui/ButtonIcon";

import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./hooks/useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
export function Logout() {
  const { logoutFn, isLoading } = useLogout();
  function handleLogout() {
    logoutFn();
  }
  return (
    <ButtonIcon onClick={handleLogout} disabled={isLoading}>
      {" "}
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}{" "}
    </ButtonIcon>
  );
}
