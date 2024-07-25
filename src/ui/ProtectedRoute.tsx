import { ReactNode, useEffect } from "react";
import { useUser } from "../features/authentication/hooks/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  //load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  //if  there's no  authenticated user, redirect to the login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [navigate, isAuthenticated, isLoading]);

  //while loading, show a spinner
  if (isLoading)
    <FullPage>
      <Spinner />
    </FullPage>;
  ///if  there is a user,render  the app
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
