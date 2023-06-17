import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import auth from '../modules/auth';

class Cart {

    sign = async (setOrders,setGroupStatus, setDeliveryCost, setEndDate, id) => {
        this.setOrders = setOrders;
        this.setGroupStatus = setGroupStatus;
        this.setDeliveryCost = setDeliveryCost;
        this.setEndDate = setEndDate;
        this.groupID = id;
    }

    joinRoom = async () => {
        try {
            this.connection ??= new HubConnectionBuilder()
                .withUrl(import.meta.env.BASE_URL+'/cart', { accessTokenFactory: () => auth.getToken() }).configureLogging(LogLevel.Information)
                .build();

            this.connection.on("OrdersInCart", (orders) => {
                this.setOrders(orders);
            });

            this.connection.on("ChangedGroupStatus", (orderStatusKey) => {
                this.setGroupStatus(orderStatusKey);
            });

            this.connection.on("ChangedGroupDeliveryCost", (deliveryCost) => {
                this.setDeliveryCost(deliveryCost);
            });

            this.connection.on("ChangedGroupTimer", (endDate) => {
                this.setEndDate(endDate);
            });

            if (!this.connection._connectionStarted)
                await this.connection.start();

            await this.connection.invoke("JoinRoom",  this.groupID);
        } catch (e) {
            console.log(e);
        }
    }

    addToCart = async (order) => {
        try {
            console.log(order)
            order.groupID = this.groupID;
            await this.connection.invoke("AddToCart", order);
        } catch (e) {
            console.log("addToCart",e);
        }
    }

    removeFromCart = async (uid) => {
        try {
            await this.connection.invoke("RemoveFromCart", uid);
        } catch (e) {
            console.log(e);
        }
    }
}
export default new Cart();
