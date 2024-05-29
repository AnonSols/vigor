import { Database } from "./supabase";

export type BookingType = Database['public']['Tables']['bookings']['Row']
