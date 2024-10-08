import styled, { keyframes } from "styled-components";
// import { BiLoaderAlt } from "react-icons/bi";
import { FiLoader } from "react-icons/fi";
const rotate = keyframes`
  to {
    transform: rotate(2turn)
  }
`;

const SpinnerMini = styled(FiLoader)`
  width: 2.4rem;
  height: 2.4rem;
  animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
