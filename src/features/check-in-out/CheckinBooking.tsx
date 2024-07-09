import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/hooks/useBooking";
import { BookingType } from "../../../types/bookingsTypes";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./hook/useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmData, setConfirmData] = useState(false);
  const [breakfastPrice, setbreakfastPrice] = useState(false);
  const { data, isLoading } = useBooking();
  const moveBack = useMoveBack();

  const booking = data as BookingType;

  useEffect(() => setConfirmData(booking?.isPaid ?? true), [booking]);

  const { checkin, checkingIn } = useCheckin();

  function handleCheckin() {
    if (!confirmData) return;
    console.log(booking.id);
    checkin(booking.id);
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          id="breakfast"
          checked={breakfastPrice}
          disabled={false}
          onChange={() => {
            setConfirmData(false);
            setbreakfastPrice((b) => !b);
          }}
        >
          Want to add Breakfast for {booking.guests.name}
        </Checkbox>
      </Box>
      <Box>
        <Checkbox
          id="confirm"
          disabled={confirmData}
          checked={confirmData}
          onChange={() => setConfirmData((confirm) => !confirm)}
        >
          I confirm that {booking.guests.name} has paid the total amount of{" "}
          {formatCurrency(booking.totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        {confirmData && (
          <Button onClick={handleCheckin} disabled={checkingIn}>
            Check in booking #{booking.id}
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
