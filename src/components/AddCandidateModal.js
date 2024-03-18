import React, { useState } from 'react';
import { Button, TextField, Modal, Box, Typography, Stack, IconButton, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addCandidate } from '../api';
import { useContext } from "react";
import { MyContext } from '../MyContext';

const AddCandidateModal = ({ availableSkills }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { candidates, setCandidates } = useContext(MyContext);
  const [candidate, setCandidate] = useState({
    name: '',
    email_id: '',
    phone_number: '',
    expected_salary: '',
    skills: [{ id: '', experience: '' }]
  });

  const restForm = () => {
    setCandidate({
      name: '',
      email_id: '',
      phone_number: '',
      expected_salary: '',
      skills: [{ id: '', experience: '' }]
    })  
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCandidate({ ...candidate, [name]: value });
  };

  const handleSkillChange = (index, event) => {
    const { value } = event.target;
    const skills = [...candidate.skills];
    skills[index].id = value;
    setCandidate({ ...candidate, skills });
  };

  const handleExperienceChange = (index, event) => {
    const { value } = event.target;
    const skills = [...candidate.skills];
    skills[index].experience = value;
    setCandidate({ ...candidate, skills });
  };

  const handleAddSkill = () => {
    setCandidate({ ...candidate, skills: [...candidate.skills, { id: '', experience: '' }] });
  };

  const handleRemoveSkill = (index) => {
    const skills = [...candidate.skills];
    skills.splice(index, 1);
    setCandidate({ ...candidate, skills });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      let response = await addCandidate(candidate)
      response.skills = response.skills.map(skill => { return availableSkills.find(s => s.id === skill.id).name })
      setCandidates([...candidates, response]);
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setIsLoading(false)
      setOpen(false);
      restForm()
    }
  };

  const isFormValid = () => {
    return candidate.name !== '' && 
    String(candidate.email_id).toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) && 
    String(candidate.phone_number).match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    && candidate.expected_salary !== '' && parseInt(candidate.expected_salary)>0 && candidate.skills.every(skill => skill.id !== '' && skill.experience !== '');
  };

  return (
    <>
      <Button style={{ marginLeft: '87%' }} variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Candidate
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add Candidate
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={candidate.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email_id"
            value={candidate.email_id}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone_number"
            type='number'
            value={candidate.phone_number}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            type='number'
            label="Expected Salary"
            name="expected_salary"
            value={candidate.expected_salary}
            onChange={handleChange}
            required
          />
          <skillDiv>
            {candidate.skills.map((skill, index) => (
              <Stack direction="row" style={{ marginTop: '2%' }} alignItems="center" spacing={3} key={index}>
                <FormControl fullWidth>
                  <InputLabel id={`skill-label-${index}`}>Skill</InputLabel>
                  <Select
                    labelId={`skill-label-${index}`}
                    value={skill.id}
                    onChange={(e) => handleSkillChange(index, e)}
                    fullWidth
                    required
                  >
                    {availableSkills?.map((availableSkill, idx) => (
                      <MenuItem key={idx} value={availableSkill.id} disabled={candidate.skills.some((s) => s.id === availableSkill.id && s !== skill)}>
                        {availableSkill.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Experience"
                  type='number'
                  value={skill.experience}
                  onChange={(e) => handleExperienceChange(index, e)}
                  required
                />
                <IconButton onClick={() => handleRemoveSkill(index)}>
                  <RemoveIcon />
                </IconButton>
                {candidate?.skills?.length - 1 === index ? <IconButton onClick={handleAddSkill}>
                  <AddIcon />
                </IconButton> : null}
              </Stack>
            ))}
          </skillDiv>
          <Button style={{ marginLeft: '80%', marginTop: '4%', minWidth: '90px', minHeight: 40 }} variant="contained" color="primary" onClick={handleSubmit} disabled={!isFormValid()}>
            {isLoading ? <CircularProgress style={{ height: 20, color: 'white', width: 20 }} /> : 'Submit'}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddCandidateModal;
