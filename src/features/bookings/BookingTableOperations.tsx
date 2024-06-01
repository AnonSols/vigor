import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filteredField="status"
        options={[
          { name: "all", label: "All" },
          { name: "checked-out", label: "Checked out" },
          { name: "checked-in", label: "Checked in" },
          { name: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { name: "startDate-desc", label: "Sort by date (recent first)" },
          { name: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            name: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { name: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
