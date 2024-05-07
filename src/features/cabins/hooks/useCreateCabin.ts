import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCreateCabinType, tableData } from "../../../../types";
import { createEditCabin } from "../../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
    const query = useQueryClient();
    const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: ({ data, editId }: apiCreateCabinType) =>
      createEditCabin(data, editId),
    onSuccess: () => {
      toast.success("A new cabin is created!");

      query.invalidateQueries({ queryKey: [tableData.CABINS] });
    //   reset();
    },
    onError(error: Error) {
      toast.error(error.message);
    },
  });

  return {createCabin, isCreating}
}