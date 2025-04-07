//inputComponent for adding players to db and frontend.
import React, { useState } from 'react';
import {insertPlayer} from '../services/playerInsertService';

function NameForm({addPlayerToReact}) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to DB (replace with actual fetch/axios)
      const response = await insertToDB(name);
      
      if (response) {
        setSuccess(true);
        addPlayerToReact(response)
        setName(''); // Reset form
      } else {
        setError('Failed to save name to DB. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try later.');
    } finally {
      setIsLoading(false);
    }
  };

  const insertToDB = async (name) => {
    try{
        const success = insertPlayer(name)
        if(success){
            setSuccess(true)
            return success
        }
    }
    catch(error){
        alert('Failed to add player to DB')
    }

  };

  return (
    <div className="form-div">
      <form className="inputForm" onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          placeholder='Type player name...'
          value={name}
          className="join-input"
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
      </label>
      <button type="submit" className="join-button"disabled={isLoading || !name.trim()}>
        {isLoading ? 'Saving...' : 'Join'}
      </button>
    </form>
    </div>
    
  );
}

export default NameForm;