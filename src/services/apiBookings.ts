
import { Page } from "../../types";
import {   BookingType, getBookingType } from "../../types/bookingsTypes";
import { capitalizeFirstLetter, getToday } from "../utils/helpers";
import supabase from "./supabase";


export async function getBookings({ filter,sortBy,page}:getBookingType) {


const {name,label} = filter.filter
  let query = supabase
  .from("bookings")
  .select(`*,cabins(name),guests(name,email,nationality, countryFlag, nationalID )`,{count:"exact"})

//FILTER

  if(filter  && name && label ) {query = query.eq(name,capitalizeFirstLetter(label));}


//SORT - for using supabase the equivalent to sort array method is the order.

if(sortBy.field) query.order(sortBy.field,{ascending:sortBy.description ==='asc'})

//PAGINAION

if(page) {

  const from = (page-1) * Page.PAGE_SIZE ;
  const to = from + (Page.PAGE_SIZE-1)
query = query.range(from,to);  
}

//QUERY

const {data, error,count} = await query;


  if(error) {
    console.log(error);
    throw new Error("Bookings couldn't be loaded");
  }

  


  return {data,count};
}

export async function getBooking(id:number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
//date: ISOString

export async function getBookingsAfterDate(date:string) {
  const { data, error  } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extraPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({end:true}));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date:string) {
  const { data, error } = await supabase
    .from("bookings") 
    .select("*, guests(name)")
    .gte("startDate", date)
    .lte("startDate", getToday());
 
  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  
  return data as BookingType[]|undefined;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(name, nationality, countryFlag)")
    .or(
      `and(status.eq.Unconfirmed,startDate.eq.${getToday()}),and(status.eq.Checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}


export async function updateBooking(id:number,obj:{ isPaid?:boolean,
    status?:string;}) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id:number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);  

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
