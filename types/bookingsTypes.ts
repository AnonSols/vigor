import { newCabinType } from "./cabinTypes";
import { Database } from "./supabase";

export type BookingType = Database['public']['Tables']['bookings']['Row'] & {
              numNights: number;
              guests: { name: string; email: string,nationality:string,countryFlag:string,nationalID:string  };
              cabins: newCabinType;
              startDate: string;
              extraPrice:number;
              endDate: string;
              status: "Unconfirmed" | "Checked-in" | "Checked-out";
              totalPrice: number;
            }

export type filterProp = {filter:{name:string,label:string|null}}

export type getBookingType = {
  filter:filterProp,
  sortBy:{field:string,description:string},
  page:number;
}

export type ModifiedBookingRowInterface ={
  booking:BookingType & { numNights: number;
    guests: { name: string; email: string };
    cabins: newCabinType;
    startDate: string;
    endDate: string;
    status: "unconfirmed" | "checked_in" | "checked_out";
    totalPrice: number;}
}


 type Status = "Unconfirmed" | "Checked-in" | "Checked-out";

export const statusToTagName: Record<Status, string> = {
    Unconfirmed: "blue",
    "Checked-in": "green",
    "Checked-out": "silver",
  };
