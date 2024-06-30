import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../../services/apiBookings";
import { Page, tableData } from "../../../../types";
import { useSearchParams } from "react-router-dom";
import { filterProp } from "../../../../types/bookingsTypes";



export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams()
     
    const filteredValue = searchParams.get("status")||'all';
    const sortedByValue = searchParams.get("sortBy")||'startDate-asc'

    const [field,description] = sortedByValue.split("-");
    let filter:filterProp= {filter:{name:'status',label:''} }
   


//FILTER
    filter = !filteredValue || filteredValue !=='all'  ? {filter:{...filter.filter, label:filteredValue} }:{filter:{ ...filter.filter,label:null} } 

//SORT
    const sortBy = {
        field,description
    }

//PAGINATION

      const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

//QUERY
 const {isLoading,data} = useQuery({
     queryKey: [`${tableData.BOOKINGS}`,filter,sortBy, page],
    queryFn:()=> getBookings({filter,sortBy,page}),
 })


 /*PRE-FETCHING - helps with mobile usability because we don't get to be seeing the spinner as a result of fetching the data from the sever it give a client-side rendering feel not server side.*/


const pageCount = data?.count && Math.ceil(data?.count / Page.PAGE_SIZE)

pageCount && page < pageCount &&
queryClient.prefetchQuery({
  queryKey: [`${tableData.BOOKINGS}`,filter,sortBy, page+1],
    queryFn:()=> getBookings({filter,sortBy,page:page+1}),
})

// pageCount && page > 1 &&
// queryClient.prefetchQuery({
//   queryKey: [`${tableData.BOOKINGS}`,filter,sortBy, page-1],
//     queryFn:()=> getBookings({filter,sortBy,page:page-1}),
// })
 return {isLoading, data}
}

