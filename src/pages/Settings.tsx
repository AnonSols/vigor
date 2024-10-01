import { useEffect } from "react";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Settings() {
  useEffect(() => {
     document.title = "Rabahh | Settings";

     return () => {
       document.title = "Rabahh | Home";
     };
   }, []);
  return (
    <>
      <Row>
        <Heading as="h1">Update hotel settings</Heading>
        <UpdateSettingsForm />
      </Row>
    </>
  );
}

export default Settings;
