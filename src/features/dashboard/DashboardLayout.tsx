import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

//Booking are actual sales
//stays are actual checkin. guests staying in the hotel.
function DashboardLayout() {
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
