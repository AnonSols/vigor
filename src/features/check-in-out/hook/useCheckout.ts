import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../../services/apiBookings"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { tableData } from "../../../../types";
import { BookingType } from "../../../../types/bookingsTypes";

export function useCheckout() {

    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const {mutate:checkOut, isLoading:isCheckingOut} = useMutation({
        mutationFn:({id}:{id:number})=> updateBooking(id, {isPaid:true, status:"Checked-out"}),

        onSuccess:(data:BookingType) =>{
             const {id}= data;
    toast.success(`Booking ${id} successfully Checked Out `)
    queryClient.invalidateQueries({queryKey:[tableData.BOOKINGS]},)
            navigate('/');
        }, 

        onError:()=>  toast.error("There was an error checking out")
    })

    return {checkOut, isCheckingOut}
}