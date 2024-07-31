import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filteredField="last"
      options={[
        { name: "7", label: "Last 7 days" },
        { name: "30", label: "Last 30 days" },
        { name: "90", label: "Last 90 days" },
      ]}
    />
  );
}

export default DashboardFilter;
