import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { CircularProgress, FormControl, InputLabel, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import { updateStatusOfCandidate } from '../api';
import { useContext } from "react";
import { MyContext } from '../MyContext';
export default function CandidateTable({data}) {
  const [beignEdited, setBeingEdited] = React.useState(null);
  const { candidates, setCandidates } = useContext(MyContext);
  const [status, setStatus] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleStatusUpdate = async () => {
    try {
      setIsLoading(true);
      await updateStatusOfCandidate(status, beignEdited);
      const updatedCandidates = candidates.map(candidate => {
        if (candidate.id === beignEdited) {
          return { ...candidate, status: status };
        }
        return candidate;
      });
      setCandidates(updatedCandidates);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setBeingEdited(null);
      setIsLoading(false);
    }
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <TableContainer style={{marginTop:'1%'}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Skills</TableCell>
            <TableCell align="right">Email Id</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Expected Salary</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.skills.join()}</TableCell>
              <TableCell align="right">{row.email_id}</TableCell>
              <TableCell align="right">{row.phone_number}</TableCell>
              <TableCell align="right">{row.expected_salary}</TableCell>
              <TableCell align="right">{row.score}</TableCell>
              <TableCell align="right">
              {beignEdited === row.id?
                <FormControl sx={{ m:0,minWidth:80}} size="small">
                  <InputLabel id="demo-select-small-label">Status</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={status}
                    label="status"
                    onChange={handleStatusChange}
                  >
                    <MenuItem value='contacted'>Contacted</MenuItem>
                    <MenuItem value='interview scheduled'> Interview Scheduled</MenuItem>
                    <MenuItem value='offer extended'> Offer Extended</MenuItem>
                    <MenuItem value='hired'>Hired</MenuItem>
                    <MenuItem value='rejected'>Rejected</MenuItem>
                  </Select>
                </FormControl>
              :row.status}
              </TableCell>
              <TableCell align="right">

              {isLoading && beignEdited === row.id ? <CircularProgress style={{height:25,color:'black',width:25}}/>: beignEdited === row.id ? <DoneOutlineIcon style={{cursor:'pointer'}} onClick={handleStatusUpdate}/>: <EditIcon style={{cursor:'pointer'}} onClick={() => {setBeingEdited(row.id);setStatus(row.status)}}/>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}