import { useMutation,useQueryClient } from "@tanstack/react-query";
import {LoginApi} from "../../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { tableData } from "../../../../types";
import { useUser } from "./useUser";


function useLogin() {

    const navigate = useNavigate()
        const queryClient = useQueryClient();

        const {user} = useUser()
    const {mutate:loginFn, isLoading:isLoggingIn} = useMutation({
        mutationFn:({email,password}:{email:string,password:string}) => LoginApi({email,password}),

        onSuccess:() => {
            queryClient.setQueriesData([ `${tableData.USER}`], user)  
            toast.success("Welcome back!");
            navigate('/dashboard')
        },

        onError:(error:Error) => {
            toast.error(error.message)
            throw new Error(error.message)
        }
    });

    return {loginFn, isLoggingIn}
}

export default useLogin;