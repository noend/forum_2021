const UserService = {
    setUser: function (arg) {
        let stringify = JSON.stringify(arg);
        localStorage.setItem('user', stringify);
    },
    getUser: function () {
        let user = localStorage.getItem('user');
        return JSON.parse(user);
    },
};
export default UserService;


