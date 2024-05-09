import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./hooks/useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSettings } from "./hooks/useUpdateSettings";
import { FocusEvent } from "react";
function UpdateSettingsForm() {
  const {
    settings: {
      minimumBookingLength,
      BreakfastPrice,
      maxBookingLength,
      maxGuestPerBooking,
    } = {},
    isLoading,
  } = useSettings();

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
          defaultValue={`${minimumBookingLength}`}
          onBlur={(e) => handleUpdateSetting(e, "minimumBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isUpdating}
          defaultValue={`${maxBookingLength}`}
          type="number"
          id="max-nights"
          onBlur={(e) => handleUpdateSetting(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isUpdating}
          defaultValue={`${maxGuestPerBooking}`}
          type="number"
          id="max-guests"
          onBlur={(e) => handleUpdateSetting(e, "maxGuestPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isUpdating}
          type="number"
          defaultValue={`${BreakfastPrice}`}
          id="breakfast-price"
          onBlur={(e) => handleUpdateSetting(e, "BreakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
