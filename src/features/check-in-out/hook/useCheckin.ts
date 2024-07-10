import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BookingType } from "../../../../types/bookingsTypes";
import { tableData } from "../../../../types";

export type breakfastType = {
    extraPrice:number,
    hasBreakfast:true,
    totalPrice:number | null | undefined
  }

export function useCheckin() {

    interface useCheckinProtocol{
      id:number,
      breakfast?:breakfastType
    }
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate:checkin, isLoading:checkingIn} = useMutation({
        mutationFn:({id,breakfast}:useCheckinProtocol) => updateBooking(id, { isPaid:true,
        status:"Checked-in",...breakfast}
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