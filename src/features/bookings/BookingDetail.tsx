import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { BookingType, statusToTagName } from "../../../types/bookingsTypes";
import useBooking from "./hooks/useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/hook/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBookings } from "./hooks/useDeleteBookings";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { data, isLoading } = useBooking();
  const { checkOut, isCheckingOut } = useCheckout();
  const moveBack = useMoveBack();

  const { deleteFn, isDeleting } = useDeleteBookings();

  const booking = data as BookingType;
  if (isLoading) return <Spinner />;

  const { status, id: bookingsId } = booking;
  //Note to self hooks should be called on the top level of a component to prevent: Invariant Violation or
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingsId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      <ButtonGroup>
        {status === "Unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingsId}`)}>
            Check in
          </Button>
        )}
        {status === "Checked-in" && (
          <Button
            onClick={() => checkOut({ id: bookingsId })}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <span>
              <Button variation="danger">Delete</Button>
            </span>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              onConfirm={() => {
                deleteFn(bookingsId, { onSettled: () => moveBack() });
              }}
              disabled={isDeleting}
              resourceName="booking"
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
