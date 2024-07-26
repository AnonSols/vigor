import { FormEvent, useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUser } from "./hooks/useUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point

  type userProp = {
    email?: string;
    user_metadata: { fullName: string };
  };

  const { user } = useUser();

  if (!user || !user.user_metadata || !("fullName" in user.user_metadata)) {
    return null; // or a loading indicator, or an error message
  }

  const modifiedUser: userProp = {
    email: user.email,
    user_metadata: {
      fullName: user.user_metadata.fullName,
    },
  };

  const {
    email,
    user_metadata: { fullName: currentFullName },
  } = modifiedUser;

  const [fullName, setFullName] = useState(currentFullName);
  // const [avatar, setAvatar] = useState<FileList | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          // onChange={(e) => setAvatar(e.target.files ? e.target.files[0] : null)}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
