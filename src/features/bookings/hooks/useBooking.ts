import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../../services/apiBookings";
import { tableData } from "../../../../types";
import { useSearchParams } from "react-router-dom";
import { filterProp } from "../../../../types/bookingsTypes";



export function useBooking() {
    const [searchParams] = useSearchParams()
     
    const filteredValue = searchParams.get("status")||'all';


    let filter:filterProp= {filter:{name:'status',label:''} }

   
    filter = !filteredValue || filteredValue !=='all'  ? {filter:{...filter.filter, label:filteredValue} }:{filter:{ ...filter.filter,label:null} } 
 
 const {isLoading,data} = useQuery({
     queryKey: [`${tableData.BOOKINGS}`,filter],
    queryFn:()=> getBookings(filter),
 })

 return {isLoading, data}
}

