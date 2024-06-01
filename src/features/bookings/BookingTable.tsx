import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import {
  BookingType,
  ModifiedBookingRowInterface,
  // ModifiedBookingRowInterface,
} from "../../../types/bookingsTypes";

function BookingTable() {
  const bookings: BookingType[] = [];

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
          data={bookings}
          render={(currentComponent: unknown) => {
            const newBooking = currentComponent as ModifiedBookingRowInterface;
            return (
              <BookingRow
                key={newBooking.booking.id}
                booking={newBooking.booking}
              />
            );
          }}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
