import axios from 'axios';
import { toast } from 'react-toastify';


const URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/results/`;

export async function getResults(rollNo) {
  try {
    const { data } = await axios.get(URL+rollNo);
    return data.student;
  } catch(err) {
    let message = 'Something went wrong';
    if (err.response) {
      message = err.response.data.message;
    } else {
      message = err.message;
    }
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER
    });
  }
} 