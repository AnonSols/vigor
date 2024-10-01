import { useEffect } from "react";
import AddCabinButton from "../features/cabins/AddCabinButton";
import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
function Cabins() {
  
   useEffect(() => {
     document.title = "Rabahh | Rooms";

     return () => {
       document.title = "Rabahh | Home";
     };
   }, []);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Rooms</Heading>

        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Row>
        <AddCabinButton />
      </Row>
    </>
  );
}

export default Cabins;
