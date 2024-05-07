import { useQuery } from "@tanstack/react-query";
import { tableData } from "../../../../types";
import { getCabins } from "../../../services/apiCabins";

export function useCabin() {
      const {
    isLoading,
    data: cabins,
    // error,
  } = useQuery({
    queryKey: [`${tableData.CABINS}`],
    queryFn: getCabins,
  });

  return {isLoading, cabins}
}