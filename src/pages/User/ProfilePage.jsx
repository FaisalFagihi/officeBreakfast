import {Container} from 'rsuite';
import AccountInfo from "../../components/User/AccountInfo";
import UserGuests from "../../components/User/UserGuests";
export  default function ProfilePage() {

    return (
        <Container>
            <AccountInfo />
            <br />
            <UserGuests />
        </Container>
    );
}
