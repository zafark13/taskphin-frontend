import axios from "axios";

export const addCandidate = async (newCandidate) => {
  try {
    // Send POST request to API to add new candidate
    const response = await axios.post('https://taskphin-hxal.onrender.com/candidates', newCandidate);
    return response.data;
  } catch (error) {
    console.error('Error adding candidate:', error);
    // Rethrow the error to handle it at the caller level if necessary
    throw error;
  }
};

export const getSkills = async () => {
  try {
    // Send GET request to API to add new candidate
    const response = await axios.get('https://taskphin-hxal.onrender.com/skills');
    return response.data;
  } catch (error) {
    console.error('Error getting skills:', error);
    // Rethrow the error to handle it at the caller level if necessary
    throw error;
  }
};

export const getCandidates = async () => {
  try {
    // Send GET request to API to add new candidate
    const response = await axios.get('https://taskphin-hxal.onrender.com/candidates');
    return response.data;
  } catch (error) {
    console.error('Error getting candidates:', error);
    // Rethrow the error to handle it at the caller level if necessary
    throw error;
  }
};

  export const updateStatusOfCandidate = async(status,id) => {
    try {
       // Send POST request to API to add new candidate
    const repsonse = await axios.patch(`https://taskphin-hxal.onrender.com/candidates/${id}`, { status })
    return repsonse.data
    } catch (error) {
      console.error('Error adding candidate:', error);
      // Rethrow the error to handle it at the caller level if necessary
      throw error;
    }
  };

