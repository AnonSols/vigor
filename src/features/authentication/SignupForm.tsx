import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./hooks/useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

interface signupProtocol {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignupForm() {
  const {
    register,
    formState: { errors },
    getValues,
    reset,
    handleSubmit,
  } = useForm<signupProtocol>();

  const { signUp, isSigningUp } = useSignup();
  function onSubmit(data: signupProtocol) {
    const { email, password, fullName } = data;

    signUp({ email, password, fullName }, { onSettled: () => reset() });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={`${errors.fullName?.message}`}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow label="Email address" error={`${errors.email?.message}`}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email",
            },
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={`${errors.password?.message}`}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password length cannot be less than 8",
            },
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={`${errors.confirmPassword?.message}`}
      >
        <Input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "This password doesn't match!",
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>{!isSigningUp ? "Create new user" : <SpinnerMini />}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
