import { useMutation } from "@tanstack/react-query";
import {LoginApi} from "../../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function useLogin() {

    const navigate = useNavigate()
    const {mutate:loginFn, isLoading:isLoggingIn} = useMutation({
        mutationFn:({email,password}:{email:string,password:string}) => LoginApi({email,password}),

        onSuccess:() => {
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