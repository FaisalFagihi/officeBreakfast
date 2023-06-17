import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import MenuPage from "./pages/Restaurant/MenuPage";
import RestaurantsPage from "./pages/Restaurant/RestaurantsPage";
import GroupCreationPage from "./pages/Group/GroupCreationPage";
import ProfilePage from "./pages/User/ProfilePage";
import GroupPage from "./pages/Group/GroupPage";
import DeliveryAppLinkPage from './pages/User/DeliveryAppLinkPage';
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Route, Routes } from "react-router-dom";
import CreateRestaurantsPage from './pages/Restaurant/CreateRestaurantsPage';
import WalletPage from './pages/User/WalletPage';
import OrdersPage from './pages/Group/OrdersPage';
// import 'rsuite/dist/rsuite-no-reset.min.css';
import 'rsuite/dist/rsuite.min.css';
import './App.scss';
import { ResetPasswordPage } from "./pages/Login/ResetPasswordPage";
import { messaging } from './modules/firebase'
import { getToken, onMessage  } from 'firebase/messaging'
import { useEffect } from "react";
import GlobalNotificationService from "./components/Navbar/GlobalNotificationService";
function App() {

  const requestPermission = async () => {
    const perimission = await Notification.requestPermission()
    if (perimission === 'granted'){
      const token = await getToken(messaging, { vapidKey: 'BAusTrWhr_PENeKaWEJnjxpZJJ1BeuEgANFHrM3e0gOM41y4JatuCsO-2TNgMKy_xSmu9RKT81OZM5moNDdtBXg' })
      console.log('token',token)
    }
  }

  useEffect(() => {

    requestPermission()

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // ...
      GlobalNotificationService.showNotification(payload?.notification?.body)
    });

  }, []);

  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/customize" element={<CreateRestaurantsPage />} />
        <Route path="/GroupCreation" element={<GroupCreationPage />} />
        <Route path="/Group/:groupID" element={<GroupPage />} />
        <Route path="/Menu/:restaurant_id" element={<MenuPage />} />
        <Route path="/Profile/" element={<ProfilePage />} />
        <Route path="/Wallet/" element={<WalletPage />} />
        <Route path="/Orders/" element={<OrdersPage />} />
        <Route path="/DeliveryAppLink/" element={<DeliveryAppLinkPage />} />
      </Route>
      <Route exact path="/login" element={<LoginPage />} />
      <Route path="*" element={<div>404 NOT FOUND</div>} />
      <Route path="/ResetPassword/:resetToken" element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default App;


