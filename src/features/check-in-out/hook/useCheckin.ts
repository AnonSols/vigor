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
        mutationFn:({id}:{id:number}) => updateBooking(id, { isPaid:true,
        status:"checked-in"}
  ),

  onSuccess: ({data}:{data:BookingType})=> {
    toast.success(`Booking ${data.id} successfully Checked In`)

    queryClient.invalidateQueries({queryKey:[tableData.BOOKINGS], },)
    navigate('/')
  },
  onError:() => toast.error("There was an error while checking in")
    }
  )
     

    return {checkin, checkingIn}
}