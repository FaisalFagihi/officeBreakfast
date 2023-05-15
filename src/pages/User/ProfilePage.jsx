import {Container} from 'rsuite';
import AccountInfo from "../../components/User/AccountInfo";
import UserGuests from "../../components/User/UserGuests";
export  default function ProfilePage() {

    return (
        <Container className="h-screen p-5">
            <AccountInfo />
            <br />
            <UserGuests />
        </Container>
    );
}
