import { useQuery } from "@tanstack/react-query"
import { getStaysTodayActivity } from "../../../services/apiBookings"
import { tableData } from "../../../../types"

 
const useTodayActivity = () => {
   const {data:currentActivities, isLoading:isLoadingCurrentActivities} = useQuery({
      queryKey:[tableData.ACTIVITY],
    queryFn:getStaysTodayActivity,
   })
 
   return {currentActivities,isLoadingCurrentActivities}
}

export default useTodayActivity