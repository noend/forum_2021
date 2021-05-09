import axios from 'axios';

const inst = axios.create({
    baseURL: 'http://localhost:8082',
    auth: {
        username: 'admin',
        password: 'admin'
    }
});

export default inst;