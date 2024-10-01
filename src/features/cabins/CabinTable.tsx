// import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabin } from "./hooks/useCabins";
import Table from "../../ui/Table";
import { newCabinType } from "../../../types";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { isLoading, cabins } = useCabin();

  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  const filteredValue = searchParams.get("discount") || "all";
  let filteredCabin: newCabinType[] | undefined;

  // console.log(filteredCabin);
  if (filteredValue === "all") filteredCabin = cabins;

  if (filteredValue === "with-discount")
    filteredCabin = cabins?.filter(
      (cabin) => cabin.discount && cabin.discount > 0
    );

  if (filteredValue === "no-discount")
    filteredCabin = cabins?.filter(
      (cabin) => cabin.discount && cabin.discount === 0
    );

  const sortedBy = searchParams.get("sortBy") || "name-asc";

  const [field, direction] = sortedBy.split("-");

  const modifier = direction === "desc" ? -1 : 1;
  // const sortedCabins = filteredCabin?.sort(
  //   (a, b) => a[field] - b[field] * modifier
  // );

const sortedCabins = filteredCabin?.sort((a, b) => {
  const aValue = a[field as keyof newCabinType];
  const bValue = b[field as keyof newCabinType];

  if (typeof aValue === "number" && typeof bValue === "number") {
    return (aValue - bValue) * modifier;
  }

  if (typeof aValue === "string" && typeof bValue === "string") {
    return aValue.localeCompare(bValue) * modifier;
  }

  return 0;
});
  return (
    <Menus>
      <Table column="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.header>
          <div></div>
          <div>Room</div>
          <div>Capicty</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.header>
        <Table.body
          data={sortedCabins}
          render={(currentComponent: unknown) => {
            const newCabin = currentComponent as newCabinType;

            return <CabinRow cabin={newCabin} key={newCabin.id} />;
          }}
        />
        {/* {cabins?.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))} */}
      </Table>
    </Menus>
  );
}

export default CabinTable;
