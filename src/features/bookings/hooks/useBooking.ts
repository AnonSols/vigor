import { useQuery } from '@tanstack/react-query'
import { tableData } from '../../../../types'
import { getBooking } from '../../../services/apiBookings'
import { useParams } from 'react-router-dom'

function useBooking() {

    const {bookingsId} = useParams();

    const {data, error,isLoading} = useQuery({
    queryKey:[`${tableData.BOOKINGS}`],
    queryFn:()=>getBooking(Number(bookingsId)),
    retry:false,
})

if(error) throw Error("There was an issue getting this single bookings page!")

return {data, error,isLoading }
}

export default useBooking