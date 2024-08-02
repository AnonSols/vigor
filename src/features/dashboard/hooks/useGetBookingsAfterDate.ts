import {useSearchParams} from "react-router-dom"
import  {subDays } from "date-fns"
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../../services/apiBookings";
import { tableData } from "../../../../types";
export function useGetBookingAfterDate() {
    const [searchParams] = useSearchParams();

    const getDate = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));


const queryDate =  subDays(new Date(), getDate).toISOString()

const {isLoading:isLoadingAfterDate,data} = useQuery({
    queryFn:()=>  getBookingsAfterDate(queryDate),
    queryKey:[`${tableData.BOOKINGS}, last-${getDate}`]
})

return  {isLoadingAfterDate,  data}
}