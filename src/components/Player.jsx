// singular playerComponent.
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { deletePlayer } from '../services/playerDeleteService';


const Player = ({id, name, onDeleteSuccess}) => {
    const handleDelete = async () => {
        try{
            const success = await deletePlayer(id)
            if (success){
                onDeleteSuccess(id)
            }
        }
        catch (error) {
            alert('Failed to delete player')
        }


        

    }


  return (
    <div className="player">
      <p className = "playerName">{name || '-'}</p>
      <button
      className="player-delete-button"
      type = "button"
      onClick={handleDelete}
      >
        <CloseIcon className ="closeIcon" fontSize="medium" color="inherit"/>
      </button> 
    </div>
  );
};


export default Player;