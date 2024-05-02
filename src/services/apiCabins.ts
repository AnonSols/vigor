
import { CabinType } from "../../types";
import supabase from "./supabase";

export async function getCabins() {
 try{
   const { data } = await supabase.from("cabins").select("*");

 

return data;
}catch(err) {
   throw new Error(
  "An error occured from our end getting the cabins, it will be rectified soon!")
}
}

export async function createCabin(data:CabinType) {
try {
  
const { data:newCabin,  } = await supabase
  .from('cabins')
  .insert(data)
  .select()

  return newCabin;

}catch(err) {
 
throw new Error("An error occurerd creating a cabin.")
}
  



    
}

export async function deleteCabins(id:number) {

const {data, error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id)

  if(error) throw new Error("Cabins couldn't be deleted!")

    return data;
}