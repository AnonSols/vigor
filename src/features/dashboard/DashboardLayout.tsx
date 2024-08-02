import styled from "styled-components";
import {
  useGetBookingStays,
  // useGetBookingAfterDate,
} from "./hooks/useGetBookingStays.ts";
import Spinner from "../../ui/Spinner.tsx";

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
  const { stay, isLoadingStays } = useGetBookingStays();

  if (isLoadingStays) return <Spinner />;
  console.log(stay);
  return (
    <StyledDashboardLayout>
      <div>Statistic</div>
      <div>Today's activity</div>
      <div>chart stay duration</div>
      <div>chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
