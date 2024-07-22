import { ReactNode } from "react";
import styled from "styled-components";

const StyledFormRowVertical = styled.div`
  display: grid;

  align-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

type FormRowType = {
  label?: string;
  children: ReactNode & { props?: { id: string } };
  error?: string;
};
function FormRowVertical({ label, children, error }: FormRowType) {
  return (
    <StyledFormRowVertical>
      {label && <Label htmlFor={children.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error === "undefined" ? "" : error}</Error>}
    </StyledFormRowVertical>
  );
}

export default FormRowVertical;
