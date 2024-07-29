import styled from "styled-components";
import { Logout } from "../features/authentication/Logout";
import HeaderTab from "./HeaderTab";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeader = styled.ul`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  gap: 0.4rem;
`;

const Tooltip = styled.div`
  /* Tooltip container */

  position: relative;
  display: inline-block;

  /* Tooltip text */
  .tooltiptext {
    visibility: hidden;
    // width: 120px;
    font-size: 1.3rem;
    background-color: var(--color-grey-400);
    color: #fff;
    text-align: center;
    padding: 5px;
    border-radius: 6px;

    /* Position the tooltip text */
    position: absolute;
    z-index: 1;
    bottom: -120%;
    left: 50%;
    margin-left: -28px;

    /* Fade in tooltip */
    opacity: 0;
    transition: opacity 0.49s;
  }

  /* Tooltip arrow */
  // .tooltiptext::after {
  //   content: "";
  //   position: absolute;
  //   bottom: 100%;
  //   left: 50%;
  //   margin-left: -13px;
  //   border-width: 5px;
  //   border-style: solid;
  //   border-color: #555 transparent transparent transparent;
  // }

  /* Show the tooltip text when you mouse over the tooltip container */
  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;
const HeaderMenu = () => {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <li>
        <Tooltip>
          <HeaderTab
            onClick={() => navigate("/account")}
            icon={<HiOutlineUser />}
          />
          <div className="tooltiptext">Account</div>
        </Tooltip>
      </li>
      <li>
        <Tooltip>
          <DarkModeToggle />
          <div className="tooltiptext">Toggle</div>
        </Tooltip>
      </li>

      <li>
        <Tooltip>
          <Logout />
          <div className="tooltiptext">Logout</div>
        </Tooltip>
      </li>
    </StyledHeader>
  );
};

export default HeaderMenu;
