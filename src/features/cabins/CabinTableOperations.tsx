import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

const CabinTableOperations = () => {
  const FilterCabin = [
    { name: "all", label: "All" },
    { name: "with-discount", label: "With Discount" },
    { name: "no-discount", label: "No Discount" },
  ];

  const SortCabin = [
    { name: "name-asc", label: "Sort by name (A-Z)" },
    { name: "name-desc", label: "Sort by name (Z-A)" },
    { name: "regularPrice-asc", label: "Sort by name price (low-first)" },
    { name: "regularPrice-desc", label: "Sort by name price (high-first)" },
    { name: "maxCapacity-asc", label: "Sort by name Capacity (low-first)" },
    { name: "maxCapacity-desc", label: "Sort by name Capacity (high-first)" },
  ];
  return (
    <TableOperations>
      <Filter filteredField="discount" filteredCabin={FilterCabin} />

      <SortBy options={SortCabin} />
    </TableOperations>
  );
};

export default CabinTableOperations;
