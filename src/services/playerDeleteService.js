// deletes the player with the given id from db. 
import { supabase } from './supabaseClient'

export const deletePlayer = async(id) => {
  const {data, error} = await supabase
    .from('players')
    .delete()
    .eq('id', Number(id))
    .select('*') 
  if (error){
    throw new Error(error.message)
  }
  return true
  }
