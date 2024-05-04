import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm-V1";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>

        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>

      <Button onClick={() => setShowForm((show) => !show)}>
        {!showForm ? "Add new Cabins" : "Hide cabins"}{" "}
      </Button>

      {showForm && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
