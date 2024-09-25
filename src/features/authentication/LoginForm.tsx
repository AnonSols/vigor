import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import useLogin from "./hooks/useLogin";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini";
// import { useForm } from "react-hook-form";

function LoginForm() {
  const [email, setEmail] = useState("new@gmail.com");
  const [password, setPassword] = useState("12345");
  // const {reset} = useForm();
  const { loginFn, isLoggingIn } = useLogin();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) toast.error("Please enter complete credentials");

    loginFn({ email, password });
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormRowVertical label="Email address">
          <Input
            type="email"
            id="email"
            // This makes this form better for password managers
            autoComplete="username"
            value={email}
            disabled={isLoggingIn}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            disabled={isLoggingIn}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button
            size="large"
            disabled={
              isLoggingIn || !email || !password || (!email && !password)
            }
          >
            {!isLoggingIn ? "Login" : <SpinnerMini />}
          </Button>
        </FormRowVertical>
      </Form>
    </>
  );
}

export default LoginForm;
