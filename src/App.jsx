import { useState } from 'react'
import Teams from './components/Teams'

import './App.css'

function App() {
  const [teamBlue, setTeamBlue] = useState([]);
  const [teamRed, setTeamRed] = useState([]);


  return (
    <div className="layout">
      <h1 className="title">Lentopallo 19.4.2025</h1>
      <Teams
        teamBlue={teamBlue}
        teamRed={teamRed}
        setTeamBlue={setTeamBlue}
        setTeamRed={setTeamRed}
       />
    </div>
  )
}

export default App
