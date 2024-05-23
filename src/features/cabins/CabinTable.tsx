// import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabin } from "./hooks/useCabins";
import Table from "../../ui/Table";
import { newCabinType } from "../../../types";
import Menus from "../../ui/Menus";
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

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table column="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.header>
          <div></div>
          <div>Cabin</div>
          <div>Capicty</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.header>
        <Table.body
          data={cabins}
          render={(cabin: unknown) => {
            const newCabin = cabin as newCabinType;

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
