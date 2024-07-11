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
import { breakfastType, useCheckin } from "./hook/useCheckin";
import { useSettings } from "../settings/hooks/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmData, setConfirmData] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { checkin, checkingIn } = useCheckin();
  const { data, isLoading } = useBooking();
  const moveBack = useMoveBack();

  const booking = data as BookingType;
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const optionalBreakfastPrice =
    settings?.BreakfastPrice &&
    booking.numGuests &&
    booking.numNights &&
    settings.BreakfastPrice * booking.numGuests * booking.numNights;

  useEffect(() => setConfirmData(booking?.isPaid ?? true), [booking]);

  function handleCheckin() {
    if (!confirmData) return;

    const breakfast: breakfastType = {
      extraPrice: optionalBreakfastPrice as number,
      hasBreakfast: true,
      totalPrice:
        optionalBreakfastPrice &&
        ((booking.totalPrice + optionalBreakfastPrice) as number),
    };

    if (addBreakfast) {
      checkin({ id: booking.id, breakfast });
    } else checkin({ id: booking.id });
  }

  if (isLoading || isLoadingSettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!booking.hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            disabled={false}
            onChange={() => {
              setConfirmData(false);
              setAddBreakfast((b) => !b);
            }}
          >
            Want to add Breakfast for{" "}
            {formatCurrency(optionalBreakfastPrice as number)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          id="confirm"
          disabled={confirmData}
          checked={confirmData}
          onChange={() => setConfirmData((confirm) => !confirm)}
        >
          I confirm that {booking.guests.name} has paid the total amount of{" "}
          {formatCurrency(
            addBreakfast && optionalBreakfastPrice
              ? ((booking.totalPrice + optionalBreakfastPrice) as number)
              : booking.totalPrice
          )}
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
