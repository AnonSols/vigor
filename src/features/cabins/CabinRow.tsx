import styled from "styled-components";
import { newCabinType } from "../../../types/cabinTypes";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./hooks/useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./hooks/useCreateCabin";
import Modal from "../../ui/Modal";
// import { HiDotsVertical } from "react-icons/hi";
// import Row from "../../ui/Row";
// import { HiDotsVertical } from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
// import ConfirmDelete from "../../ui/ConfirmDelete";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

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
  // const [isOpen, setIsOpen] = useState(false);
  const { createCabin, isCreating } = useCreateCabin();

  const {
    image,
    maxCapacity,
    name,
    regularPrice,
    discount,
    id: cabinId,
    description,
  } = cabin;

  function handleDuplicate() {
    const data = {
      name: `copy of ${name}` as string,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    } as newCabinType;
    createCabin({ data });
  }
  return (
    <>
      <Table.row>
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
          <button disabled={isCreating} onClick={handleDuplicate}>
            <HiSquare2Stack />
          </button>
          <Modal>
            <Modal.Open opens="pencil">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>

            <Modal.Window name="pencil">
              <CreateCabinForm cabin={cabin} />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens="delete">
              <button disabled={isDeleting} onClick={() => deleteFn(cabinId)}>
                <HiTrash />
              </button>
            </Modal.Open>

            <Modal.Window name="delete">
              <ConfirmDelete
                onConfirm={() => deleteFn(cabinId)}
                disabled={isDeleting}
                resourceName="cabins"
              />
            </Modal.Window>
          </Modal>
        </div>
        {/* <Modal>
          <Modal.Open opens="icon">
            <HiDotsVertical />
          </Modal.Open>
          <Modal.Window name="icon">
            <Row type="vertical">
              <button disabled={isCreating} onClick={handleDuplicate}>
                <HiSquare2Stack />
              </button>
              <Modal>
                <Modal.Open opens="pencil">
                  <button>
                    <HiPencil />
                  </button>
                </Modal.Open>

                <Modal.Window name="pencil">
                  <CreateCabinForm cabin={cabin} />
                </Modal.Window>
              </Modal>

              <Modal>
                <Modal.Open opens="delete">
                  <button
                    disabled={isDeleting}
                    onClick={() => deleteFn(cabinId)}
                  >
                    <HiTrash />
                  </button>
                </Modal.Open>

                <Modal.Window name="delete">
                  <ConfirmDelete
                    onConfirm={() => deleteFn(cabinId)}
                    disabled={isDeleting}
                    resourceName="cabins"
                  />
                </Modal.Window>
              </Modal>
            </Row>
          </Modal.Window>
        </Modal> */}
      </Table.row>

      {/* {isOpen && <CreateCabinForm cabin={cabin} />} */}
    </>
  );
}

export default CabinRow;
