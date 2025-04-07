// inserts a new player instance into supabase db. 
import { supabase } from './supabaseClient'

export const insertPlayer = async(name) => {
  const {data, error} = await supabase.rpc('add_player_with_auto_team' ,{
    player_name: name
  }).select('*')

  if (error){
    throw new Error(error.message)
  }
  return data



  }
