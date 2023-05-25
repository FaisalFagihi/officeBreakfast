import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import auth from '../modules/auth';

class Notification {

    constructor() {
        this.connection = null;
    }

    init = async (setLogs) => {
        try {
            this.setLogs = setLogs;

            this.connection ??= new HubConnectionBuilder()
                .withUrl("https://officebreakfast.azurewebsites.net/notification", { accessTokenFactory: () => auth.getToken() }).configureLogging(LogLevel.Information)
                .build();

            console.log("init")
            this.connection.on("ReceiveNotification", (message, time, isOld) => {
                console.log("ReceiveNotification")
                console.log(message)
                this.setLogs(logs => [...logs, { message:message, time:time, isOld }]);
            });

            this.connection.onclose(e => {
                this.connection = null;
                this.setLogs([]);
            });

            if (!this.connection._connectionStarted){
                await this.connection.start();
                console.log("start")
            }

        } catch (e) {
            console.log(e);
        }
    }
}
export default new Notification();
