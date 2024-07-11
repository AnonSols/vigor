import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

interface FilterButtonInterface {
  active?: boolean;
}
const FilterButton = styled.button<FilterButtonInterface>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

interface FilterInterface {
  options: Array<{ name: string; label: string }>;
  filteredField: string;
}

const Filter = ({ options, filteredField }: FilterInterface) => {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick(name: string) {
    searchParams.set(filteredField, name);

    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  const [searchParam] = useSearchParams();

  const currentFilter = searchParam.get(filteredField) || "all";
  return (
    <StyledFilter>
      {options.map(({ name, label }) => (
        <>
          <FilterButton
            active={currentFilter === name}
            onClick={() => handleClick(name)}
            disabled={currentFilter === name}
          >
            {label}
          </FilterButton>
        </>
      ))}
    </StyledFilter>
  );
};

export default Filter;
