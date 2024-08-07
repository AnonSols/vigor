import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { dataBookingInterface } from "./hooks/useGetBookingsAfterDate";
import Stat from "./Stat";
import { BookingType } from "../../../types/bookingsTypes";
import { formatCurrency } from "../../utils/helpers";

interface StatsData {
  bookings: dataBookingInterface[] | undefined;
  stay: BookingType[] | undefined;

  confirmedState: BookingType[] | undefined;
}
const Stats = ({ bookings, confirmedState, stay }: StatsData) => {
  //1 Actual sales length
  const numBookings = bookings && bookings.length;

  //2 Bookings are actual sales in the hotel
  const sales =
    bookings &&
    bookings.reduce((acc, curr) => {
      return acc + curr.totalPrice;
    }, 0);

  //3 Get stays which are the current checkins, confirmed stays
  const confirmedStays = confirmedState && confirmedState.length;

  //4 Occupancy rate - num of night / amount of cabin

  const numNights = stay && stay.filter((guest) => guest.numNights != 0);
  console.log(numNights);
  console.log(confirmedState);
  return (
    <>
      <Stat
        title="Bookings"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
        color="blue"
      />

      <Stat
        title="Sales"
        value={sales && Number(formatCurrency(sales))}
        icon={<HiOutlineBanknotes />}
        color="green"
      />

      <Stat
        title="Checkins"
        value={confirmedStays}
        icon={<HiOutlineCalendarDays />}
        color="indigo"
      />

      <Stat
        title="Occupancy rate"
        value={numBookings}
        icon={<HiOutlineChartBar />}
        color="yellow"
      />
    </>
  );
};

export default Stats;
