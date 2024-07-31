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
        <Img src="/public\Rabahh.png" alt="Logo" />
      ) : (
        <Img src="/public\logoblackpng.png" alt="Logo" />
      )}
    </StyledLogo>
  );
}

export default Logo;
