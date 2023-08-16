import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import MenuPage from "./pages/Restaurant/MenuPage";
import RestaurantsSection from "./pages/Restaurant/RestaurantsSection";
import GroupCreationPage from "./pages/Group/GroupCreationPage";
import ProfilePage from "./pages/User/ProfilePage";
import GroupPage from "./pages/Group/GroupPage";
import DeliveryAppLinkPage from './pages/User/DeliveryAppLinkPage';
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Route, Routes } from "react-router-dom";
import CustomizeRestaurantPage from './pages/Restaurant/CustomizeRestaurantPage';
import WalletPage from './pages/User/WalletPage';
import OrdersPage from './pages/Group/OrdersPage';
// import 'rsuite/dist/rsuite-no-reset.min.css';
import 'rsuite/dist/rsuite.min.css';
import './App.scss';
import { ResetPasswordPage } from "./pages/Login/ResetPasswordPage";

// import { onBackgroundMessage } from 'firebase/messaging/sw'
import { useEffect } from "react";
import userController from "./controller/userController";
import auth from "./modules/auth";
import MePage from "./pages/Home/MePage";
import NotificationsPage from "./pages/User/NotificationsPage";
import EmailConfirmation from "./pages/Login/EmailConfirmation";
import ForgotPasswordPage from "./pages/Login/ForgotPasswordPage";
function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/me" element={<MePage />} />
        <Route path="/restaurants" element={<RestaurantsSection />} />
        <Route path="/restaurants/customize" element={<CustomizeRestaurantPage />} />
        <Route path="/GroupCreation" element={<GroupCreationPage />} />
        <Route path="/Group/:groupID" element={<GroupPage />} />
        <Route path="/Menu/:restaurant_id" element={<MenuPage />} />
        <Route path="/Profile/" element={<ProfilePage />} />
        <Route path="/Wallet/" element={<WalletPage />} />
        <Route path="/Orders/" element={<OrdersPage />} />
        <Route path="/DeliveryAppLink/" element={<DeliveryAppLinkPage />} />
        <Route path="/notifications/" element={<NotificationsPage />} />
      </Route>
      <Route path="/RegisterConfirmation/:token" element={<EmailConfirmation />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route path="*" element={<div>404 NOT FOUND</div>} />
      <Route path="/ResetPassword/:resetToken" element={<ResetPasswordPage />} />
      <Route path="/ForgotPassword/" element={<ForgotPasswordPage />} />
    </Routes>
  );
}

export default App;


