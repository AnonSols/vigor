import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi} from "../../../services/apiSettings";
import toast from "react-hot-toast";
import { tableData } from "../../../../types";

export function useUpdateSettings() {
    const query = useQueryClient();
    const {mutate:updateSetting,isLoading:isUpdating} = useMutation({
        mutationFn:updateSettingApi,
        onSuccess:()=> {

            toast.success("Settings has been updated Successfully!")
            query.invalidateQueries({queryKey:[`${tableData.SETTINGS}`]});
        },
        onError:(err)=> toast.error((err as Error).message)
    })

    return {updateSetting, isUpdating}
}