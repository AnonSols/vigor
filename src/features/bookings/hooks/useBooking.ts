import { useQuery } from '@tanstack/react-query'
import { tableData } from '../../../../types'
import { getBooking } from '../../../services/apiBookings'
import { useParams } from 'react-router-dom'

function useBooking() {

    const {bookingId} = useParams();

    const {data, error,isLoading} = useQuery({
    queryKey:[`${tableData.BOOKINGS}`],
    queryFn:()=>getBooking(Number(bookingId)),
    retry:false,
})

if(error) throw Error("There was an issue getting this single bookings page!")

    console.log(data)
return {data, error,isLoading }
}

export default useBooking