import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../../services/apiBookings";
import { tableData } from "../../../../types";

export function useBooking() {
 const {isLoading,data} = useQuery({
     queryKey: [`${tableData.BOOKINGS}`],
     queryFn:getBookings,
 })

 return {isLoading, data}
}

