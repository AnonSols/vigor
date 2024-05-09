import { useQuery } from "@tanstack/react-query";
import { SettingsType, tableData } from "../../../../types";
import { getSettings } from "../../../services/apiSettings";

export function useSettings() {
 const { data:settings,error,isLoading } = useQuery<SettingsType>({
     queryKey: [`${tableData.SETTINGS}`],
    queryFn: getSettings,
  });


  return{settings,error,isLoading}

}