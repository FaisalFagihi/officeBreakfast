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
        localStorage.removeItem('username')
        localStorage.removeItem('firstName')
        localStorage.removeItem('lastName')
        localStorage.removeItem('picture')

        this.authenticated = false;
    }

    isAuthenticated() {
        return localStorage.getItem("token") != null;
    }

    getUsername() {
        return localStorage.getItem('username')
    }
    getFirstName() {
        return localStorage.getItem('firstName')
    }
    getLastName() {
        return localStorage.getItem('lastName')
    }

    getName() {
        return localStorage.getItem('firstName') +" "+localStorage.getItem('lastName')
    }

    getPicture() {
        return localStorage.getItem('picture')
    }

    getToken() {
        return localStorage.getItem("token")
    }
}

export default new Auth();
