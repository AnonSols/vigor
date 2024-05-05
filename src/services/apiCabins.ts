
import { newCabinType } from "../../types";
import supabase, { SUPABASE_URL } from "./supabase";
// import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
export async function getCabins() {

 try{
   const { data, error } = await supabase.from("cabins").select("*");

   if(error) throw new Error("An error occured getting the cabins")


return data;
}catch(err) {
  throw new Error((err as Error).message)
}
}

export async function createEditCabin(data:newCabinType, id?:number) {
  try {
    
  const imageName = `${Math.random()}-${data.image.name}`.replaceAll('/',"");

  const hasMoviePath = data.image?.startsWith?.(SUPABASE_URL);
  const imageUrl =  hasMoviePath ? data.image : `${SUPABASE_URL}/storage/v1/object/public/cabins/${imageName}`; 
  // const imageUrl =  `${SUPABASE_URL}/storage/v1/object/public/cabins/${imageName}`; 


  //create and edit the cabin

  let query = supabase.from('cabins')

  //create
  if(!id) query = query.insert([{...data,image:imageUrl}]);

  //edit 
  if(id) query = query
  .update({...data, image:imageUrl })
  .eq('id', id)
  

  
  const {data:newCabin,error} = await query.select().single();
  
  
  if(error) {console.log(error)
    throw new Error("An error occurerd creating a cabin.") 
}
  
 //create the image
 
const { error:storageError } = await supabase
  .storage
  .from('cabins')
  .upload(imageName, data.image )
 

  //delete cabin if an storage error occured
  if (storageError) {
    await supabase
  .from('cabins')
  .delete()
  .eq('id', data.id)


  throw new Error("An error uploading your image and cabin has been deleted.")
  }
  return {newCabin};
  
  
}catch(err) {
  
  throw new Error((err as Error).message)
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