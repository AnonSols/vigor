import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { BookingType, statusToTagName } from "../../../types/bookingsTypes";
import { newCabinType } from "../../../types";
import Menus from "../../ui/Menus";
import { HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

type BookingRowType = {
  booking: BookingType & {
    numNights: number;
    guests: { name: string; email: string };
    cabins: newCabinType;
    startDate: string;
    endDate: string;
    status: "Unconfirmed" | "Checked-in" | "Checked-out";
    totalPrice: number;
  };
};

function BookingRow({ booking }: BookingRowType) {
  const {
    startDate,
    endDate,
    status: bookingStatus,
    totalPrice,
    cabins: { name: cabinName },
    guests: { name: guestName, email },
    numNights,
    id,
  } = booking;

  const navigate = useNavigate();

  const status = bookingStatus || "Unconfirmed";

  return (
    <Table.row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Menus.Menu>
        <Menus.Toggle id={id} />
        <Menus.List id={id}>
          <Menus.Button
            icon={<HiEye />}
            click={() => navigate(`/bookings/${id}`)}
          >
            See details
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.row>
  );
}

export default BookingRow;
