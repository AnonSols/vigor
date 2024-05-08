import { useQuery } from "@tanstack/react-query";
import { tableData } from "../../../../types";
import { getSettings } from "../../../services/apiSettings";

export function useSettings() {
 const { data:settings,error,isLoading } = useQuery({
     queryKey: [`${tableData.SETTINGS}`],
    queryFn: getSettings,
  });

  return{settings,error,isLoading}

}