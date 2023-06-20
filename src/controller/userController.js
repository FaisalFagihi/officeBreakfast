import axiosInstance from "../interceptors/axiosInstance"

class UserController {
    getCurrentUser = (callback)=> {
        axiosInstance.get("me")
            .then(({ data }) => {
                console.log(data)
                callback(data)
            }).catch((error) => {

            });
    }

    getGuests = () => {
        return axiosInstance.get("Guests/",);
    }

    getOwners = () => {
        return axiosInstance.get("Owners/",);
    }

    submitGuest = (username) => {
        return axiosInstance.post("SubmitGuest", { username: username })
    }

    getWallet = () => {
        return axiosInstance.get("Wallet");
    }

    getGuestsBalence = () => {
        return axiosInstance.get("GuestsBalence");
    }

    submitWalletRecord = (guestUserName, amount, remark) => {
        console.log({ guestName:guestUserName, amount:amount, remark:remark })
        return axiosInstance.post("AddWalletRecord", { guestName:guestUserName, amount:amount, remark:remark });
    }

    sendJoinRequest = (ownerUsername) => {
        return axiosInstance.get("JoinToGroup", {params:{ownerUsername}});
    }

    removeGuest = (guestUsername) => {
        return axiosInstance.get("RemoveGuest", {params:{guestUsername}});
    }

    getUserLogs = () => {
        return axiosInstance.get("MyLogs",);
    }

    clearUserLogs = () => {
        return axiosInstance.get("ClearLogs",);
    }

    searchGuest = (word) => {
        return axiosInstance.get("Search", {params:{word}});
    }

    resetPassword = (email) => {
        return axiosInstance.get("ForgotPassword", {params:{email}});
    }

    updatePassword = (newPassword, token) => {
        console.log(newPassword, token)
        return axiosInstance.post("UpdatePassword", { newPassword: newPassword, token: token })
    }

    registerFcmToken = (token) => {
        return axiosInstance.post("registerFcmToken", { fcmToken: token })
    }
}

export default new UserController();