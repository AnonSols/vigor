import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BookingType } from "../../../../types/bookingsTypes";
import { tableData } from "../../../../types";


export function useCheckin() {

    
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate:checkin, isLoading:checkingIn} = useMutation({
        mutationFn:(id:number) => updateBooking(id, { isPaid:true,
        status:"checked-in"}
  ),

  onSuccess: (data:BookingType)=> {
    const {id}= data;
    toast.success(`Booking ${id} successfully Checked In`)
    queryClient.invalidateQueries({queryKey:[tableData.BOOKINGS]},)
    // queryClient.invalidateQueries({active:true},)
    navigate('/');
    
  },
  onError:(error:Error) => {toast.error(error.message)}
    }
  )
     

    return {checkin, checkingIn}
}