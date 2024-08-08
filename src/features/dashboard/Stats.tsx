import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { dataBookingInterface } from "./hooks/useGetBookingsAfterDate";
import Stat from "./Stat";
import { BookingType } from "../../../types/bookingsTypes";
import { newCabinType } from "../../../types";

interface StatsData {
  bookings: dataBookingInterface[] | undefined;
  stay: BookingType[] | undefined;
  cabins: newCabinType[] | undefined;
  confirmedState: BookingType[] | undefined;
  numDays: number;
}
const Stats = ({ bookings, confirmedState, cabins, numDays }: StatsData) => {
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

  //4 Occupancy rate - num of night / amount of cabin(number of cabins * number of days)
  const confirmedNightStaysLength = confirmedState?.reduce(
    (acc, curr) => acc + curr.numNights,
    0
  );

  const cabinsLength = cabins && cabins.length * numDays;
  const occupancyRate =
    confirmedNightStaysLength &&
    cabinsLength &&
    (confirmedNightStaysLength / cabinsLength) * 100;

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
        value={sales && sales}
        icon={<HiOutlineBanknotes />}
        color="green"
        sales={true}
        show={false}
      />

      <Stat
        title="Checkins"
        value={confirmedStays}
        icon={<HiOutlineCalendarDays />}
        color="indigo"
      />

      <Stat
        title="Occupancy rate"
        value={occupancyRate && Math.round(occupancyRate)}
        pec={true}
        icon={<HiOutlineChartBar />}
        color="yellow"
        show={false}
      />
    </>
  );
};

export default Stats;
