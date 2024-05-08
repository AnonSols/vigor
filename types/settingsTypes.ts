import { Database } from "./supabase";

export type SettingsType = Database['public']['Tables']['settings']['Row']