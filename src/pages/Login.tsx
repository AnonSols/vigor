import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  grid-template-rows: 3fr auto;
  justify-content: center;
  gap: 2.8rem;
  background-color: var(--color-grey-50);
`;
const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;
  bottom: 2rem;
  justify-content: center;
`;

function Login() {
  const year = new Date().getFullYear();
  return (
    <>
      <LoginLayout>
        <section>
          <br /> <br />
          <Logo />
          <Heading as="h4">Log in to your account</Heading>
          <br /> <br />
          <LoginForm />
        </section>
        <Footer>
          <span>Copyright ©️ {year} |</span>
          <span>
            {" "}
            A{" "}
            <a href="https://www.instagram.com/officialrabahh/" target="_blank">
              <b>Rabahh's </b>
            </a>
            product
          </span>
        </Footer>
      </LoginLayout>
    </>
  );
}

export default Login;
