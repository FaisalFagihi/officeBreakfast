import { Container } from 'rsuite';
import AccountInfo from "../../components/User/AccountInfo";
import auth from '../../modules/auth';
import { useNavigate } from 'react-router-dom';
export default function ProfilePage() {
    let navigate = useNavigate();

    return (<div>
        <AccountInfo />
    <button onClick={()=>{auth.logout(); navigate('/')} } className='text-base bg-transparent border-borderGray w-full my-5' >logout</button>
    </div>
    );
}
