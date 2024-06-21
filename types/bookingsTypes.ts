import { newCabinType } from "./cabinTypes";
import { Database } from "./supabase";

export type BookingType = Database['public']['Tables']['bookings']['Row']


export type filterProp = {filter:{name:string,label:string|null}}

export type ModifiedBookingRowInterface ={
  booking:BookingType & { numNights: number;
    guests: { name: string; email: string };
    cabins: newCabinType;
    startDate: string;
    endDate: string;
    status: "unconfirmed" | "checked_in" | "checked_out";
    totalPrice: number;}
}

