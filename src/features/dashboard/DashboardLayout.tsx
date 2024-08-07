import styled from "styled-components";
import {
  // dataBookingInterface,
  useGetBookingAfterDate,
} from "./hooks/useGetBookingsAfterDate.ts";
import { useGetBookingStays } from "./hooks/useGetBookingStays.ts";

import Spinner from "../../ui/Spinner.tsx";
import Stats from "./Stats.tsx";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

//Booking are actual sales
//stays are actual checkin. guests staying in the hotel.

function DashboardLayout() {
  // const {} = useGetBookingAfterDate();
  const { isLoadingAfterDate, data: Booking } = useGetBookingAfterDate();
  const { isLoadingStays, stay, confirmedStays } = useGetBookingStays();

  if (isLoadingAfterDate || isLoadingStays) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats stay={stay} bookings={Booking} confirmedState={confirmedStays} />
      <div>Today's activity</div>
      <div>chart stay duration</div>
      <div>chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
