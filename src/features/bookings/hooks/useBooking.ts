import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../../services/apiBookings";
import { tableData } from "../../../../types";
import { useSearchParams } from "react-router-dom";



interface BookingProtocol {
    filterName: {
    name:string,
    label:string
},
    sortBy: {name:string,label:string}[]
}
export function useBooking({filterName, sortBy}:BookingProtocol) {
    const [searchParams] = useSearchParams()
     
    const filteredValue = filterName ? searchParams.get(filterName.name) : 'all'

    let filter:{filter:{name:string,label:string|null}}= {filter:{name:'',label:''} }

    // if( !filteredValue || filteredValue !== 'all') theFilter = {filter:{name:"status", label:filteredValue} }
   
    filter = !filteredValue || filteredValue !== 'all' ? {filter:{name:"status", label:filteredValue} }:{filter:{name:"status", label:filteredValue} }
 const {isLoading,data} = useQuery({
     queryKey: [`${tableData.BOOKINGS}`,filter,sortBy],
    queryFn:()=> getBookings({filter}),
 })

 return {isLoading, data}
}

