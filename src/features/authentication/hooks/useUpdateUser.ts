import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../../services/apiAuth";
import toast from "react-hot-toast";
import { tableData } from "../../../../types";

export function useUpdateUser() {

    const queryClient = useQueryClient();
    const {mutate:updateUser,isLoading:isUpdatingUser} = useMutation({
        mutationFn:updateCurrentUser,
        onSuccess:(user) => {
            console.log(user)
            toast.success("User successfully updated!")
            queryClient.invalidateQueries([`${tableData.USER}`])
        },
        onError:(error:Error)=> {
            toast.error(error.message)
        }
    })

    return {updateUser, isUpdatingUser};
}