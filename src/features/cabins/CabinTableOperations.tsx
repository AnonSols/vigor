import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

const CabinTableOperations = () => {
  const FilterCabin = [
    { name: "all", label: "All" },
    { name: "with-discount", label: "With Discount" },
    { name: "no-discount", label: "No Discount" },
  ];
  return (
    <TableOperations>
      <Filter filteredCabin={FilterCabin} />
    </TableOperations>
  );
};

export default CabinTableOperations;
