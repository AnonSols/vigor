import {useSearchParams} from "react-router-dom"
import  {subDays } from "date-fns"
import { useQuery } from "@tanstack/react-query";
import {  getStaysAfterDate } from "../../../services/apiBookings";
import { tableData } from "../../../../types";
import { BookingType } from "../../../../types/bookingsTypes";

export function useGetBookingStays():{
    isLoadingStays: boolean;
    stay: BookingType[] | undefined;
    confirmedStays: BookingType[] | undefined;
} {
    const [searchParams] = useSearchParams();

    const getDate = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));


const queryDate =  subDays(new Date(), getDate).toISOString()

const {isLoading:isLoadingStays,data:stay} = useQuery({
    queryFn:()=>  getStaysAfterDate(queryDate),
    queryKey:[`${tableData.BOOKINGS}, last-${getDate}`]
})

const confirmedStays = stay?.filter(user=>user?.status ===  "Checked-in" || user?.status === "Checked-out")


return  {isLoadingStays, stay, confirmedStays}
}