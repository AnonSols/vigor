import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { CabinType, tableData } from "../../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

// const Label = styled.label`
//   font-weight: 500;
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;
// Error;

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<CabinType>();

  console.log(errors);
  const query = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("A new cabin is created!");

      query.invalidateQueries({ queryKey: [tableData.CABINS] });
      reset();
    },
    onError(error: string) {
      console.log("check", error);
      toast.error("An error occured");
    },
  });

  function onSubmit(data: CabinType) {
    mutate({ ...data, image: data.image?.at(0) as string });
  }

  // function onError(errors: string) {
  //   // console.log("There was an error ", errors);
  // }
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
            required: "This field is required!",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
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
              "Your discount must be lower than your regular price",
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
        <FileInput id="image" accept="image/*" {...register("image")} />
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
