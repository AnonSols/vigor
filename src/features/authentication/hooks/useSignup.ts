import { useMutation } from "@tanstack/react-query";
import { SignupApi } from "../../../services/apiAuth";
import toast from "react-hot-toast"; 

export function useSignup() {
const {mutate:signUp,isLoading:isSigningUp} = useMutation({
    mutationFn:SignupApi,
    onSuccess:()=>{
        toast.success("User has been successfully singed up,Please confirm email!")
    
    },
    onError:(error:Error)=>{
        toast.error(error.message)
         throw new Error(`users couldn't be created: ${error.message}`)
    }
    
})

return {signUp,isSigningUp}
}