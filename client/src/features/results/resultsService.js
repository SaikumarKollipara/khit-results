import axios from 'axios';
import { toast } from 'react-toastify';

import { BACKEND_URL } from '../../data/constants';


const URL = `${BACKEND_URL}/api/v1/results/`;

export async function getResults(rollNo) {
  rollNo = rollNo.toLowerCase();
  try {
    const { data } = await axios.get(URL+rollNo, {withCredentials: true});
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