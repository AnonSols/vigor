import { newCabinType } from "./cabinTypes";
import { Database } from "./supabase";

export type BookingType = Database['public']['Tables']['bookings']['Row']



 export type filterNameType =  {
  filter:{name:string,
  label:string|null}
} 
// export type filterNameType =  Filter ;


export type ModifiedBookingRowInterface ={
  booking:BookingType & { numNights: number;
    guests: { name: string; email: string };
    cabins: newCabinType;
    startDate: string;
    endDate: string;
    status: "Unconfirmed" | "Checked_in" | "Checked_out";
    totalPrice: number;}
}

