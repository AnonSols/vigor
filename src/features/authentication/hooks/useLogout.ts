import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogoutApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
const queryClient = useQueryClient();
const navigate = useNavigate();
    const {mutate:logoutFn,isLoading} = useMutation({
        mutationFn:LogoutApi,
        onSuccess:()=>{
        queryClient.removeQueries();
        toast.success('Successfully Logged Out!')
        navigate('/login',{replace:true})
        },
        onError:()=>toast.error('There was an Error Logging Out!')
    })

    return {isLoading,logoutFn}
}