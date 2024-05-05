import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { apiCreateCabinType, newCabinType, tableData } from "../../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<newCabinType>();

  console.log(errors);
  const query = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: ({ data }: apiCreateCabinType) => createEditCabin(data),
    onSuccess: () => {
      toast.success("A new cabin is created!");

      query.invalidateQueries({ queryKey: [tableData.CABINS] });
      reset();
    },
    onError(error: Error) {
      toast.error(error.message);
    },
  });

  function onSubmit(data: newCabinType) {
    mutate({ data: { ...data, image: data.image[0] as string } });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={`${errors?.name?.message}`}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", { required: "This field is required!" })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={`${errors?.maxCapacity?.message}`}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity cannot be less than 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={`${errors?.regularPrice?.message}`}>
        <Input
          type="number"
          disabled={isCreating}
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required!",
            min: {
              value: 70000,
              message: "Price must be greater than NGN 70,000",
            },
          })}
        />
      </FormRow>

      <FormRow error={`${errors?.discount?.message}`} label="Discount">
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required!",
            validate: (value) =>
              value! <= getValues().regularPrice! ||
              "Discount cannot be greater than the regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={`${errors?.description?.message}`}>
        <Textarea
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register("description", { required: "This field is required!" })}
        />
        {/* <Textarea type="number" id="description" defaultValue="" /> */}
      </FormRow>

      <FormRow error={`${errors?.image?.message}`} label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add new cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
