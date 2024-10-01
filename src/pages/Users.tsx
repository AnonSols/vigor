import { useEffect } from "react";
import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

function NewUsers() {
  useEffect(() => {
    document.title = "Rabahh | Users";

    return () => {
      document.title = "Rabahh | Home";
    };
  }, []);
  return (
    <>
      <Heading as="h1">Create a new user</Heading>

      <SignupForm />
    </>
  );
}

export default NewUsers;
