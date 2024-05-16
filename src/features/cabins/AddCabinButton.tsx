import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm-V1";
import Modal from "../../ui/Modal";

const AddCabinButton = () => {
  const [showForm, setShowForm] = useState(false);

  CreateCabinForm;
  return (
    <div>
      <Button onClick={() => setShowForm((show) => !show)}>
        {!showForm ? "Add new Cabins" : "Hide cabins"}{" "}
      </Button>

      {showForm && (
        <Modal onClose={() => setShowForm((s) => !s)}>
          <CreateCabinForm onCloseModal={() => setShowForm((s) => !s)} />
        </Modal>
      )}
    </div>
  );
};

export default AddCabinButton;
