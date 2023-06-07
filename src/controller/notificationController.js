import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import auth from '../modules/auth';
import GlobalNotificationService from '../components/Navbar/GlobalNotificationService';

class Notification {

    constructor() {
        this.connection = null;
    }

    init = async (setLogs) => {
        try {
            this.setLogs = setLogs;

            this.connection ??= new HubConnectionBuilder()
                .withUrl(import.meta.env.VITE_API_URL+'/notification', { accessTokenFactory: () => auth.getToken() }).configureLogging(LogLevel.Information)
                .build();

            console.log("init")
            this.connection.on("ReceiveNotification", (message, time, isOld) => {

                GlobalNotificationService.showNotification(message)
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
