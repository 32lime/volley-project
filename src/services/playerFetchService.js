// fetches all players from cloud db. 
import { supabase } from './supabaseClient'

export const fetchPlayers = async() => {
  const {data, error} = await supabase
    .from('players')
    .select('*')
  if (error){
    throw new Error(error.message)
  }
    const blueTeam = data.filter(player => player.team === 'Blue')
    const redTeam = data.filter(player => player.team === 'Red')
    return [blueTeam, redTeam]
  }
