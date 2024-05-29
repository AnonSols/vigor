import { Database } from "./supabase";

 type CabinType = Database['public']['Tables']['cabins']['Row']
//  export type newCabinType = Omit<CabinType, 'image'> & {image:string & {name:string}};

export type newCabinType = CabinType & {image?:{name?:string}}
export interface apiCreateCabinType {
    editId?:number,
    data:newCabinType
}