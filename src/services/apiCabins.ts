
import { newCabinType } from "../../types";
import supabase, { SUPABASE_URL } from "./supabase";

export async function getCabins() {
 try{
   const { data, error } = await supabase.from("cabins").select("*");

   if(error) throw new Error("An error occured getting the cabins")


return data;
}catch(err) {
  throw new Error((err as Error).message)
}
}

// type newCabinType = CabinType & {image:{name:string}}


export async function createCabin(data:newCabinType) {
  try {
    
    
  const imageName = `${Math.random()}-${data.image.name}}`.replaceAll('/',"");

  const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/cabins/${imageName}`; 
  
  //create the cabin
  const { data:newCabin, error } = await supabase
  .from('cabins')
  .insert({...data,image:imageUrl})
  .select()
  
  
  if(error) 
    throw new Error("An error occurerd creating a cabin.") 

  
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

  console.log(storageError);

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