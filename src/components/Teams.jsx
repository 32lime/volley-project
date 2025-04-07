import React, { useState, useEffect } from 'react';
import Player from './Player'
import { fetchPlayers } from '../services/playerFetchService'
import NameForm from './InputComponent'
import { supabase } from '../services/supabaseClient'

//kind of an dumpster fire of an file, but returns both teams and inputComponent.
// this file also handles adding and removing players from frontend. 
// also handles teams update after randomization to frontend.
// actual randomization is done in backend. 

export default function Teams({ teamBlue, teamRed, setTeamBlue, setTeamRed }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRandomizing, setIsRandomizing] = useState(false)

    useEffect(() => {
      fetchPlayers()
        .then(data => {
          setTeamBlue(data[0] || []); // First column (Team Bleu)
          setTeamRed(data[1] || []); // Second column (Team Red)
          setLoading(false);
          return <div>

          </div>

        })
        .catch(error => {
          console.error('Error fetching players:', error);
          setError(error);
          setLoading(false);
        });
    }, []);
    
    const handleDeleteSuccess = (deletedId) => {
      setTeamBlue(prev => prev.filter(player => player.id !== deletedId));
      setTeamRed(prev => prev.filter(player => player.id !== deletedId));

    }

    const addPlayerToReact = (newPlayer) => {
      console.log(newPlayer)
      if (newPlayer.team == "Blue"){
        setTeamBlue(prevTeam => [...prevTeam, newPlayer])
      }
      else if (newPlayer.team == "Red"){
        setTeamRed(prevTeam => [...prevTeam, newPlayer])
      }
      else{
        throw new Error("Player was added into the database but couldnt be rendered. Refresh page.")
      }
    
    }

    const handleRandomize = async () =>{
      setIsRandomizing(true)
      try{
        const { data, error } = await supabase.rpc('randomize_teams_balanced').select('*')
        if (error) throw error

        const blueTeam = data.filter(player => player.team === 'Blue')
        const redTeam = data.filter(player => player.team === 'Red')

        setTeamBlue(blueTeam || [])
        setTeamRed(redTeam || [])

      } catch(err) {
        console.log(err)
      } finally{
        setIsRandomizing(false)
      }
    }

    if (loading) return <div className="teams-loading">Loading teams...</div>;
    if (error) return <div className="teams-error">Error loading teams</div>;
  
    return (
      <div className="big-div">
        <div className="teams-container">
        <div className="team team-a">
          <h2>Team 1</h2>
          <div className="players-list">
            {teamBlue.map((playerData) => (
              <Player key={playerData.id} id={playerData.id} name={playerData.name} onDeleteSuccess={handleDeleteSuccess} />
            ))}
          </div>
        </div>

        <NameForm addPlayerToReact={addPlayerToReact}></NameForm>
  
        <div className="team team-b">
          <h2>Team 2</h2>
          <div className="players-list">
            {teamRed.map((playerData) => (
              <Player key={playerData.id} id={playerData.id} name={playerData.name} onDeleteSuccess={handleDeleteSuccess} />
            ))}
          </div>
        </div>
      </div>
      <div className='randomize-div'>
        <button
        onClick={handleRandomize}
        disabled={isRandomizing}
        className="randomize-button"
        >
          {isRandomizing ? 'Randomizing...' : 'Shuffle teams'}
        </button>
      </div>

      </div>
      
    );
}



