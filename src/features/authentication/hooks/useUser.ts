import { useQuery } from "@tanstack/react-query";
import { tableData } from "../../../../types";
import { getCurrentUser } from "../../../services/apiAuth";

export function useUser() {

const {data:user,isLoading} = useQuery({
    queryKey:[`${tableData.USER}`],
    queryFn:getCurrentUser,
});

return {user,isLoading,isAuthenticated: user?.role === 'authenticated'}
}