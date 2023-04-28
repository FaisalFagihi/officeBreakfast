import axiosInstance from "../interceptors/axiosInstance"

class Auth {
    constructor() {
        this.authenticated = false;
    }

    async setToken(token) {
        await localStorage.setItem("token", token)
        this.authenticated = true
    }

    async login(username, password) {
        const loginData = {
            "Username": username,
            "Password": password
        };
        return axiosInstance.post("login", loginData);
    }

    async loginByGoogleAuth(token) {
        return axiosInstance.get("GoogleAuth",  {params:{token}});
    }


    logout() {
        localStorage.removeItem('token')
        this.authenticated = false;
    }

    isAuthenticated() {
        return localStorage.getItem("token") != null;
    }

    getUsername() {
        return localStorage.getItem('username')
    }

    getName() {
        return localStorage.getItem('firstName') +" "+localStorage.getItem('lastName')
    }

    getToken() {
        return localStorage.getItem("token")
    }
}

export default new Auth();
