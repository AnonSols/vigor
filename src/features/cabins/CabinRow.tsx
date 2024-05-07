import styled from "styled-components";
import { newCabinType } from "../../../types/cabinTypes";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";
import { useDeleteCabin } from "./hooks/useDeleteCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  text-align: "center";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }: { cabin: newCabinType }) {
  const { isDeleting, deleteFn } = useDeleteCabin();
  const {
    image,
    maxCapacity,
    name,
    regularPrice,
    discount,
    id: cabinId,
  } = cabin;

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TableRow role="row">
        <Img src={image!} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice!)}</Price>
        {discount! <= 0 ? (
          <span>&mdash;</span>
        ) : (
          <Discount>{formatCurrency(discount!)}</Discount>
        )}
        <div>
          <button onClick={() => setIsOpen((show) => !show)}>edit</button>
          <button disabled={isDeleting} onClick={() => deleteFn(cabinId)}>
            Delete
          </button>
        </div>
      </TableRow>

      {isOpen && <CreateCabinForm cabin={cabin} />}
    </>
  );
}

export default CabinRow;
