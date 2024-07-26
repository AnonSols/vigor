

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


interface updateCurrentUserProtocol {
  password:string,
  fullName:string,
  avatar:string
}
export async function updateCurrentUser({password,  fullName, avatar}:updateCurrentUserProtocol) {

  let updateUserData:{ data: { fullName: string; }; } | { password: string; };
  if (password) updateUserData = {password}
  if (fullName) updateUserData = {data:{fullName}}
//1. Update password or fullName

const {data,error} = await supabase.auth.updateUser(updateUserData)

    if (error) throw new Error(error.message);
  
    if(!avatar)return data;

//2. upload the avatarimage
const fileName = `avatar-${data.user.id}-${Math.random()}`;

const {error:StorageError} = await supabase.storage.from("avatars").upload(fileName, avatar)

if (StorageError) throw new Error(StorageError.message)
//3. update  avatar in the user


}
          
export async function LogoutApi() {
  const {error} = await supabase.auth.signOut()

  if(error) throw new Error(error.message);

}