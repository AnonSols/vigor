

import supabase from "./supabase";

export async function LoginApi({email,password}:{email:string, password:string}){

    
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
})

if(error) throw new Error(error.message)
 
 return data;
}

export async function SignupApi({fullName,email,password}:{email:string,password:string,fullName:string}) {
  
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options:{
    data:{
      fullName,
      avatar:''
    }
  }
})

if(error)throw new Error(error.message)

  return data
}
export async function getCurrentUser() {

  const {data:session} = await supabase.auth.getSession()

  if(!session.session) return null
   const {data:userData, error} = await supabase.auth.getUser()

    if (error) throw new Error(error.message);

   return userData?.user;
}



export async function LogoutApi() {
  const {error} = await supabase.auth.signOut()

  if(error) throw new Error(error.message);

}