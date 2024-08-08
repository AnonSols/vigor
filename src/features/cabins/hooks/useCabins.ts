import { useQuery } from "@tanstack/react-query";
import { newCabinType, tableData } from "../../../../types";
import { getCabins } from "../../../services/apiCabins";

export function useCabin():{isLoading:boolean,cabins:newCabinType[]|undefined} {
      const {
    isLoading,
    data,
    // error,
  } = useQuery({
    queryKey: [`${tableData.CABINS}`],
    queryFn: getCabins,
  });

  const cabins= data  as  newCabinType[]|undefined
  return {isLoading, cabins}
}