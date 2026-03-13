import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://wqfdjpwdbmkdrecohxum.supabase.co"
const supabaseKey = "sb_publishable_xlG32GNaED_Pgq105Me5Ig_UQtdIoaS"

export const supabase = createClient(supabaseUrl, supabaseKey)