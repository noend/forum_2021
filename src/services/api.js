import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const inst = axios.create({
    baseURL: 'http://localhost:8082/api',
});

const getAccessToken = () => {
    return localStorage.getItem('access_token');
}

const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
}

inst.interceptors.request.use(request => {
    request.headers['Authorization'] = `bearer ${getAccessToken()}`;
    return request;
});

const refreshAuthLogic = failedRequest => {
    const refresh = axios.create({
        baseURL: 'http://localhost:8082',
        auth: {
            username: 'admin',
            password: 'admin'
        }
    });
    return refresh.post(`/oauth/token?grant_type=refresh_token&refresh_token=${getRefreshToken()}`)
    .then(tokenRefreshResponse => {
        localStorage.setItem('access_token', tokenRefreshResponse.data.access_token);
        localStorage.setItem('refresh_token', tokenRefreshResponse.data.refresh_token);
        failedRequest.response.config.headers['Authorization'] = 'bearer ' + tokenRefreshResponse.data.access_token;
        return Promise.resolve();
    });
};

// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(inst, refreshAuthLogic);

export default inst;