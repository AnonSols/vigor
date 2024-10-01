import styled from "styled-components";
import { useDarkModeToggle } from "../context/DarkModeToggleContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkModeToggle();
  return (
    <StyledLogo>
      {isDarkMode ? (
        <Img src="/rabahh.png" alt="Logo" />
      ) : (
        <Img src="/adlen.png" alt="Logo" />
      )}
    </StyledLogo>
  );
}

export default Logo;
