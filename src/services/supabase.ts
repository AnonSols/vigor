import { createClient } from '@supabase/supabase-js'
// import { Database } from '../../types';


export const SUPABASE_URL =  (import.meta.env.VITE_SUPABASE_URL as string);
const SUPABASE_KEY =  (import.meta.env.VITE_SUPABASE_KEY as string)

const supabase = createClient(
    SUPABASE_URL,SUPABASE_KEY
)

export default supabase;