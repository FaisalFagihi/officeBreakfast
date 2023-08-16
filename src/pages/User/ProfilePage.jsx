import { Container } from 'rsuite';
import AccountInfo from "../../components/User/AccountInfo";
import auth from '../../modules/auth';
import { useNavigate } from 'react-router-dom';
import { Panel } from '../../style/Style';
export default function ProfilePage() {
    let navigate = useNavigate();

    return (
        <div>
            <Panel header={<b>Account Profile</b>} shaded  className={'p-5 bg-white'}>
                <AccountInfo />
            </Panel>
            <button onClick={() => { auth.logout(); }} className='text-base bg-transparent p-2 rounded border border-borderGray w-full my-5' >logout</button>
        </div>
    );
}
