import { ReactElement, ReactNode } from "react";
// import { IconType } from "react-icons/lib";
import styled from "styled-components";

const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;

function DataItem({
  Icon,
  label,
  children,
}: {
  Icon: ReactElement;
  label: string;
  children: ReactNode;
}) {
  return (
    <StyledDataItem>
      <Label>
        {Icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
}

export default DataItem;
