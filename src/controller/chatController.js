import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import auth from '../modules/auth';

class Chat {

    constructor() {
        this.connection = null;
    }
    sign = async (setMessage, setUsers) => {
        this.setMessages = setMessage;
        this.setUsers = setUsers;
    }

    joinRoom = async (id) => {
        try {
            this.connection ??= new HubConnectionBuilder()
                .withUrl("https://officebreakfast.azurewebsites.net/chat", { accessTokenFactory: () => auth.getToken() }).configureLogging(LogLevel.Information)
                .build();

            this.connection.on("ReceiveMessage", (user, message, time) => {
                let type = 'Receiver';

                switch (user) {
                    case auth.getUsername():
                        type = 'Sender';
                        break;
                    case "Alter":
                        type = 'Alter';
                        break;
                    default:
                        break;
                }

                this.setMessages(messages => [...messages, { user, message, type, time }]);
            });

            this.connection.on("UsersInRoom", (users) => {
                this.setUsers(users);
            });

            this.connection.onclose(e => {
                this.connection = null;
                this.setMessages([]);
                this.setUsers([]);
            });

            console.log(this.connection)
            if (!this.connection._connectionStarted)
                await this.connection.start();

            await this.connection.invoke("JoinRoom", { groupId: id });
        } catch (e) {
            console.log(e);
        }
    }


    sendMessage = async (message) => {
        try {
            await this.connection.invoke("SendMessage", message);
        } catch (e) {
            console.log(e);
        }
    }

    closeConnection = async () => {
        try {
            await this.connection.stop();
        } catch (e) {
            console.log(e);
        }
    }
}
export default new Chat();
