import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import {
  BookingType,
  // BookingType,
  // ModifiedBookingRowInterface,
} from "../../../types/bookingsTypes";
import { useBooking } from "./hooks/useBooking";
import Spinner from "../../ui/Spinner";
import { newCabinType } from "../../../types";

function BookingTable() {
  // const bookings: BookingType[] = [];
  const { data: bookings, isLoading } = useBooking();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table column="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.header>

        <Table.body
          data={bookings as unknown[] | undefined}
          render={(currentComponent: unknown) => {
            const newBooking = currentComponent as BookingType & {
              numNights: number;
              guests: { fullName: string; email: string };
              cabins: newCabinType;
              startDate: string;
              endDate: string;
              status: "Unconfirmed" | "Checked_in" | "Checked_out";
              totalPrice: number;
            };

            return <BookingRow key={newBooking.id} booking={newBooking} />;
          }}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
