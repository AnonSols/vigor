import { ChangeEvent } from "react";
import styled from "styled-components";

interface sheet {
  type?: string;
}
const StyledSelect = styled.select<sheet>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface SelectInterface {
  options: { name: string; label: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  type: string;
}
const Select = ({ options, onChange, value, ...props }: SelectInterface) => {
  return (
    <StyledSelect value={value} {...props} onChange={onChange}>
      {options.map((option) => (
        <>
          <option value={option.name} key={option.name}>
            {option.label}
          </option>
        </>
      ))}
    </StyledSelect>
  );
};

export default Select;
