import { QueryClient } from "@tanstack/react-query";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCheckout } from "./hook/useCheckout";
import { tableData } from "../../../types";

function CheckoutButton({ bookingId }: { bookingId: number }) {
  const queryClient = new QueryClient();
  const { checkOut, isCheckingOut } = useCheckout();
  return ( 
    <Button
      variation="primary"
      size="small"
      disabled={isCheckingOut}
      onClick={() => {checkOut({ id: bookingId })
    queryClient.invalidateQueries([tableData.ACTIVITY])
    }}
    >
      {isCheckingOut ? <SpinnerMini /> : "Check out"}
    </Button>
  );
}

export default CheckoutButton;
