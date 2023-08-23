import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import auth from '../modules/auth';

class Cart {

    sign = async (setOrders, setGroupStatus, setDeliveryCost, setEndDate, id, setConnectionStatus) => {
        this.setOrders = setOrders;
        this.setGroupStatus = setGroupStatus;
        this.setDeliveryCost = setDeliveryCost;
        this.setEndDate = setEndDate;
        this.groupID = id;
        this.setConnectionStatus = setConnectionStatus;

        this.closeConn = () => new Promise(async (resolve, reject) => {
            try {
                await this.connection?.stop();
                resolve(true);
                this.setConnectionStatus(false)

            } catch (e) {
                reject(e)
            }
        })
    }

    joinRoom = async () => {
        this.closeConn().finally(async () => {
            try {
                this.connection ??= new HubConnectionBuilder()
                    .withUrl(import.meta.env.VITE_API_URL + '/cart', { accessTokenFactory: () => auth.getToken() }).configureLogging(LogLevel.Information)
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

                await this.connection.invoke("JoinRoom", this.groupID);
                this.setConnectionStatus(true)

                this.connection.onclose((error) => this.setConnectionStatus(false))



            } catch (e) {
                this.setConnectionStatus(false)
            }
        })
    }

    addToCart = async (order) => {
        try {
            console.log(order)
            order.groupID = this.groupID;
            await this.connection.invoke("AddToCart", order);
        } catch (e) {
        }
    }

    confirmOrder = async (isConfirm) => {
        try {
            let id = this.groupID
            await this.connection.invoke("ConfirmOrder", id, isConfirm);
        } catch (e) {
        }
    }

    removeFromCart = async (uid) => {
        try {
            await this.connection.invoke("RemoveFromCart", uid);
        } catch (e) {
        }
    }

    updateOrderPrice = async (username, uid, price) => {
        try {
            await this.connection.invoke("UpdateOrderPrice", username, uid, parseFloat(price));
        } catch (e) {
        }
    }
}
export default new Cart();
