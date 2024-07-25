import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  bottom: 2rem;
  justify-content: center;
`;

function Login() {
  const year = new Date().getFullYear();
  return (
    <>
      <LoginLayout>
        <Logo />
        <Heading as="h4">Log in to your account</Heading>
        <LoginForm />
      </LoginLayout>
      <Footer>Copyright ©️ {year} | A Rabahh product</Footer>
    </>
  );
}

export default Login;
