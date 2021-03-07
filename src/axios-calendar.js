import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://calendar-app-ae0a6-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;