import { useQuery } from "@tanstack/react-query"
import { getStaysTodayActivity } from "../../../services/apiBookings"

 
const useTodayActivity = () => {
   const {data:currentActivities, isLoading:isLoadingCurrentActivities} = useQuery({
      queryKey:['today-activity'],
    queryFn:getStaysTodayActivity,
   })

   console.log(currentActivities)
   return {currentActivities,isLoadingCurrentActivities}
}

export default useTodayActivity