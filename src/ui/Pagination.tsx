import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { Page } from "../../types";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

type paginationProp = {
  active?: boolean;
};
const PaginationButton = styled.button<paginationProp>`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

//add pagination functionality - The page should contain the total result over the count.

export default function Pagination({ count }: { count?: number | null }) {
  const [searchParams, setSearchParams] = useSearchParams();

  /*
  PAGINATION ALGORITHM:
   Count should be the total result

    To get every individual page count is to get the amount of data that can be rendered on every individual page.

    pageCount = Roundup the Total rendered result over the Constant page that is to be rendered on a page
   */
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = count && Math.ceil(count / Page.PAGE_SIZE);
  function onNext() {
    // the logic is that first we check for if the currentpage is equal to the page count is that is true that means that it's on the last page. so we say if we are at the last page return the currentpage
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", `${next}`);
    setSearchParams(searchParams);
  }

  function onPrev() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", `${prev}`);
    setSearchParams(searchParams);
  }

  if (pageCount && pageCount <= 1) return null;
  return (
    <StyledPagination>
      <P>
        <span>{(currentPage - 1) * Page.PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * Page.PAGE_SIZE}
        </span>{" "}
        of <span>{count}</span> results.
      </P>
      e
      <Buttons>
        <PaginationButton onClick={onPrev} disabled={currentPage === 1}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>
        <PaginationButton onClick={onNext} disabled={currentPage === pageCount}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}
