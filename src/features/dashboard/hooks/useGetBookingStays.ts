import {useSearchParams} from "react-router-dom"
import  {subDays } from "date-fns"
import { useQuery } from "@tanstack/react-query";
import {  getStaysAfterDate } from "../../../services/apiBookings";
import { tableData } from "../../../../types";
export function useGetBookingStays() {
    const [searchParams] = useSearchParams();

    const getDate = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));


const queryDate =  subDays(new Date(), getDate).toISOString()

const {isLoading:isLoadingStays,data:stay} = useQuery({
    queryFn:()=>  getStaysAfterDate(queryDate),
    queryKey:[`${tableData.BOOKINGS}, last-${getDate}`]
})

const currentGuestState = stay?.filter(user=>user.status ===  "Checked-in" || user.status === "Checked-out")


return  {isLoadingStays, currentGuestState, stay}
}