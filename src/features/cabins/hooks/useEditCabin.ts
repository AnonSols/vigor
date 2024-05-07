import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../../services/apiCabins";
import toast from "react-hot-toast";
import { apiCreateCabinType, tableData } from "../../../../types";

export function useEditCabin() {

     const query = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ data, editId }: apiCreateCabinType) =>
      createEditCabin(data, editId),
    onSuccess: () => {
      toast.success("Cabin is successfully edited!");

      query.invalidateQueries({ queryKey: [tableData.CABINS] });
    //   reset();
    },
    onError(error: Error) {
      toast.error(error.message);
    },
  });

  return {editCabin, isEditing}
}