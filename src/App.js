// App.js
import React, { useState, useEffect } from 'react';
import CandidateTable from './components/CandidateTable';
import AddCandidateModal from './components/AddCandidateModal';
import { MyContext } from './MyContext';
import { getCandidates, getSkills } from './api';
import { Box, CircularProgress } from '@mui/material';

const App = () => {
  const [candidates, setCandidates] = useState(null);
  const [availableSkills, setAvailableSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let candidatesData = await getCandidates();
        setCandidates(candidatesData);
  
        let skillsData = await getSkills();
        setAvailableSkills(skillsData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
    <h1>Taskphin</h1>

    {candidates!==null ? <MyContext.Provider value={{ candidates, setCandidates }}>
      <AddCandidateModal availableSkills={availableSkills} />
      <CandidateTable data={candidates} />      
    </MyContext.Provider>:
    <Box sx={{ display: 'flex',alignItems:'center',justifyContent:'center' }}>
      <CircularProgress />
    </Box>
    }
    </div>
  );
};

export default App;
