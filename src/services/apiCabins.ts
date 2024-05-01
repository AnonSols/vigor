import { CabinType } from "../../types";
import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error)
    throw new Error(
      "An error occured from our end getting the cabins, it will be rectified soon!"
    );

  return data;
}

export async function createCabin(data:CabinType) {

const { data:newCabin, error } = await supabase
  .from('cabins')
  .insert(data)
  .select()

  if (error) throw new Error("An error occurerd creating a cabin.")

    return newCabin;


    
}

export async function deleteCabins(id:number) {

const {data, error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id)

  if(error) throw new Error("Cabins couldn't be deleted!")

    return data;
}