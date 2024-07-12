
import { useMutation, useQueryClient} from '@tanstack/react-query'
import  {deleteBooking} from "../../../services/apiBookings"
import toast from 'react-hot-toast'
import { tableData } from '../../../../types'


export function useDeleteBookings(){

    const queryClient=useQueryClient();

    const {mutate:deleteFn,isLoading:isDeleting}  = useMutation({
        mutationFn:deleteBooking,
        onSuccess: () => {

            toast.success(`Booking has been successfully deleted`)
            queryClient.invalidateQueries({queryKey:[`${tableData.BOOKINGS}`]});
        },
        onError:()=> toast.error("There was an error delete bookings")
    })

    return{deleteFn,isDeleting}
}