import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins } from "../../../services/apiCabins";
import { tableData } from "../../../../types";
import toast from "react-hot-toast";

 export function useDeleteCabin() {

    const query = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteFn } = useMutation({
    mutationFn: deleteCabins,
    onSuccess: () => {
      toast.success("Cabins Successfully deleted!");
      query.invalidateQueries({ queryKey: [tableData.CABINS] });
    },
    onError: ({ err }: { err: { message: string } }) => {
      toast.error(err.message);
    },
  });

  return {isDeleting, deleteFn}
 }

 