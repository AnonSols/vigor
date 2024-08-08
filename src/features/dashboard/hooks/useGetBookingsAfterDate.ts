import {useSearchParams} from "react-router-dom"
import  {subDays } from "date-fns"
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../../services/apiBookings";
import { tableData } from "../../../../types";
 
export interface dataBookingInterface {
    created_at:string;
     totalPrice: number;
    extraPrice: number;
}
export function useGetBookingAfterDate():{isLoadingAfterDate:boolean, data:dataBookingInterface[]|undefined , numDays:number} {
    const [searchParams] = useSearchParams();

    const getDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));


const queryDate =  subDays(new Date(), getDays).toISOString()

const {isLoading:isLoadingAfterDate,data} = useQuery({
    queryFn:()=>  getBookingsAfterDate(queryDate),
    queryKey:[`${tableData.BOOKINGS}, last-${getDays}`]
})

return  {isLoadingAfterDate,  data, numDays:getDays}
}