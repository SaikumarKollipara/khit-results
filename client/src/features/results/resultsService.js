import axios from 'axios';
import { toast } from 'react-toastify';

import { BACKEND_URL } from '../../data/constants';


const URL = `${BACKEND_URL}/api/v1/results/`;

export async function getResults(rollNo) {
  rollNo = rollNo.toLowerCase();
  try {
    if (!rollNo.match(/^\d{2}8x(1|5)(a|d|e|f|r|s|t)\d{2}[a-z0-9]{2}$/)) throw new Error('Invalid Roll No');
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