import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import {
  BookingType,
  // BookingType,
  // ModifiedBookingRowInterface,
} from "../../../types/bookingsTypes";
import { useBookings } from "./hooks/useBookings";
import Spinner from "../../ui/Spinner";
// import { newCabinType } from "../../../types";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  // const bookings: BookingType[] = [];
  const { data: bookingsData, isLoading } = useBookings();

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table column="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.header>
          <div>Room</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.header>

        <Table.body
          data={bookingsData?.data as unknown[] | undefined}
          render={(currentComponent: unknown) => {
            const newBooking = currentComponent as BookingType;

            return <BookingRow key={newBooking.id} booking={newBooking} />;
          }}
        />

        <Table.footer>
          <Pagination count={bookingsData?.count} />
        </Table.footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
