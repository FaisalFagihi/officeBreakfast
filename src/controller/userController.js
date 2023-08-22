import axiosInstance from "../interceptors/axiosInstance"

class UserController {
    getCurrentUser = (callback) => {
        axiosInstance.get("me")
            .then(({ data }) => {
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
        return axiosInstance.post("AddWalletRecord", { guestName: guestUserName, amount: amount, remark: remark });
    }

    sendJoinRequest = (ownerUsername) => {
        return axiosInstance.get("JoinToGroup", { params: { ownerUsername } });
    }

    removeGuest = (guestUsername) => {
        return axiosInstance.get("RemoveGuest", { params: { guestUsername } });
    }

    removeOwner = (ownerUsername) => {
        return axiosInstance.get("RemoveOwner", { params: { ownerUsername } });
    }
    getUserLogs = () => {
        return axiosInstance.get("MyLogs",);
    }

    getUserLogsCount = () => {
        return axiosInstance.get("LogsCount",);
    }

    clearUserLogs = () => {
        return axiosInstance.get("ClearLogs",);
    }
    readUserLogs = () => {
        return axiosInstance.get("ReadLogs",);
    }

    searchGuest = (word) => {
        return axiosInstance.get("Search", { params: { word } });
    }

    searchVolunteer = (word) => {
        return axiosInstance.get("VolunteerSearch", { params: { word } });
    }

    resetPassword = (email) => {
        return axiosInstance.get("ForgotPassword", { params: { email } });
    }

    updatePassword = (newPassword, token) => {
        return axiosInstance.post("UpdatePassword", { newPassword: newPassword, token: token })
    }

    registerFcmToken = (token) => {
        return axiosInstance.post("registerFcmToken", { fcmToken: token })
    }

    confirmOwner = (ownerUsername) => {
        return axiosInstance.get("ConfirmOwner", { params: { ownerUsername } });
    }

    confirmGuest = (guestUsername) => {
        return axiosInstance.get("ConfirmGuest", { params: { guestUsername } });
    }

    getJoinedGuests = () => {
        return axiosInstance.get("JoinedGuests/",);
    }

    getOwnersInvitations = () => {
        return axiosInstance.get("OwnersInvitations/",);
    }

    getMyJoinRequests = () => {
        return axiosInstance.get("MyJoinRequests/",);
    }

    getMyInvitations = () => {
        return axiosInstance.get("MyInvitations/",);
    }

    cancelJoinRequest = (guestUsername) => {
        return axiosInstance.get("CancelJoinRequest", { params: { username: guestUsername } });
    }

    cancelInvitation = (guestUsername) => {
        return axiosInstance.get("CancelInvitation", { params: { username: guestUsername } });
    }

    confirmEmail = (token) => {
        return axiosInstance.get("ConfirmEmail", { params: { token: token.toString() } });
    }

    getUserMode = () => {
        return axiosInstance.get("IVolunteer");
    }

    updateUserMode = (isVolunteer) => {
        return axiosInstance.get("UpdateUserMode", { params: { isVolunteer: isVolunteer } });
    }


}

export default new UserController();