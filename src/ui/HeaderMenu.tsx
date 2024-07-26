import styled from "styled-components";
import { Logout } from "../features/authentication/Logout";
import HeaderTab from "./HeaderTab";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";

const HeaderMenu = () => {
  const StyledHeader = styled.ul`
    display: flex;
    gap: 0.4rem;
    align-items: center;
    gap: 0.4rem;
  `;
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <li>
        <HeaderTab
          onClick={() => navigate("/account")}
          icon={<HiOutlineUser />}
        />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeader>
  );
};

export default HeaderMenu;
