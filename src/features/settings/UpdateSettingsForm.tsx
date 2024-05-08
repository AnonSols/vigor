import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./hooks/useSettings";
import { SettingsType } from "../../../types";
import Spinner from "../../ui/Spinner";
import { useUpdateSettings } from "./hooks/useUpdateSettings";
import { FocusEvent } from "react";
function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();

  const convertedSettings = settings as SettingsType;
  const { register } = useForm<SettingsType>({
    defaultValues: convertedSettings,
  });

  const { isUpdating, updateSetting } = useUpdateSettings();
  if (isLoading) return <Spinner />;

  function handleUpdateSetting(
    e: FocusEvent<HTMLInputElement, Element>,
    fieldName: string
  ) {
    const value = e.target.value;

    if (!value) return;

    updateSetting({ [fieldName]: value });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          {...register("minimumBookingLength")}
          onBlur={(e) => handleUpdateSetting(e, "minimumBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="max-nights"
          {...register("maxBookingLength")}
          onBlur={(e) => handleUpdateSetting(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="max-guests"
          {...register("maxGuestPerBooking")}
          onBlur={(e) => handleUpdateSetting(e, "maxGuestPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isUpdating}
          type="number"
          id="breakfast-price"
          {...register("BreakfastPrice")}
          onBlur={(e) => handleUpdateSetting(e, "BreakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
