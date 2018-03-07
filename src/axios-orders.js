import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-eaf0f.firebaseio.com/'
})

export default instance;
