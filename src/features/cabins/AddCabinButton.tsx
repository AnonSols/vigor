// import { useState } from "react";
// import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm-V1";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

const AddCabinButton = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button> Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        {/* <Modal.Open open="table">
        <Button>Show table</Button>
      </Modal.Open >
      <Modal.Window name="table">
        <CreateCabinForm />
      </Modal.Window> */}
      </Modal>
    </div>
  );
};
// const AddCabinButton = () => {
//   const [showForm, setShowForm] = useState(false);

//   CreateCabinForm;
//   return (
//     <div>
//       <Button onClick={() => setShowForm((show) => !show)}>
//         {!showForm ? "Add new Cabins" : "Hide cabins"}{" "}
//       </Button>

//       {showForm && (
//         <Modal onClose={() => setShowForm((s) => !s)}>
//           <CreateCabinForm onCloseModal={() => setShowForm((s) => !s)} />
//         </Modal>
//       )}
//     </div>
//   );
// };

export default AddCabinButton;
