import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { newCabinType } from "../../../types";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./hooks/useCreateCabin";
import { useEditCabin } from "./hooks/useEditCabin";

// type cabinTypeInitial = newCabinType;

// type cabinType = cabinTypeInitial & { id: number };

function CreateCabinForm({
  cabin,
  onCloseModal,
}: // onClose
{
  cabin?: newCabinType;
  onCloseModal?: () => void;
}) {
  const { id: editId, ...editValue } = cabin as newCabinType;

  const isEditSession = Boolean(editId);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<newCabinType>({
    defaultValues: isEditSession ? editValue : {},
  });

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data: newCabinType) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      return editCabin(
        { data: { ...data, image }, editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      return createCabin(
        { data: { ...data, image } },

        {
          onSuccess: () => {
            onCloseModal?.();
            reset();
          },
        }
      );
  }

  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow label="Cabin name" error={`${errors?.name?.message}`}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
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
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity cannot be less than 1",
            },
            max: {
              value: 9,
              message: "Capacity cannot be more than 9",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={`${errors?.regularPrice?.message}`}>
        <Input
          type="number"
          disabled={isWorking}
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
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            min: {
              value: 0,
              message: "Discount cannot be less than 0",
            },
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
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "This field is required!" })}
        />
        {/* <Textarea type="number" id="description" defaultValue="" /> */}
      </FormRow>

      <FormRow error={`${errors?.image?.message}`} label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Add new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
