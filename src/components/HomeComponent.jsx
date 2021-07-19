import API from '../services/api';
import UserService from '../services/user';
import {Link} from "react-router-dom";

const Home = (props) => {
    let username = localStorage.getItem('username');
    localStorage.removeItem('username');
    if (username) {
        API.post('/users/getUser?name=' + username)
            .then(function (result) {
                UserService.setUser(result.data);
                props.user(result.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return <>
        <h1>Home</h1>
        <Link to='/topics'>All Topics</Link>
    </>
};

export default Home;
