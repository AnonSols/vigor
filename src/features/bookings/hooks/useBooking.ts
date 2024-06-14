import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../../services/apiBookings";
import { tableData } from "../../../../types";
import { useSearchParams } from "react-router-dom";
import { filterNameType } from "../../../../types/bookingsTypes";



interface BookingProtocol {
    filterName:filterNameType
    sortBy: {name:string,label:string}[]
}
export function useBooking({filterName, sortBy}:BookingProtocol) {
    const [searchParams] = useSearchParams()
    
    const filteredValue = filterName && searchParams.get(filterName.name)

    const filter = !filteredValue || filteredValue === 'all' ? null : {name:"status", label:filteredValue}
 const {isLoading,data} = useQuery({
     queryKey: [`${tableData.BOOKINGS}`,filter,sortBy],
     queryFn:()=> getBookings(filter),
 })

 return {isLoading, data}
}

