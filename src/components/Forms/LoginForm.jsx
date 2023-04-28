import { useState, useEffect } from 'react';
import auth from '../../modules/auth'
import { useNavigate } from 'react-router-dom';
import { Form, InputGroup, Input, IconButton, FlexboxGrid } from 'rsuite';
import EmailFillIcon from '@rsuite/icons/EmailFill';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { useDispatch } from 'react-redux'
import { RiLockPasswordFill } from 'react-icons/ri';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import '../../App.scss'

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const [loginLoad, setLoginLoad] = useState(false);

    const navigate = useNavigate();
    const login = async () => {
        setLoginLoad(true);
        auth.login(username, password).then(async (response) => {
            if (response?.status === 200) {
                auth.setToken(response.data['token'])
                await localStorage.setItem('username', response.data['username'])
                await localStorage.setItem('firstName', response.data['firstName'])
                await localStorage.setItem('lastName', response.data['lastName'])
                setMessage(response.data['message'])
                navigate("/")
            }
        }).catch((response) => {
            console.log("ss", response?.response?.data)
            setMessage(response?.response?.data);
        }).finally(() => setLoginLoad(false));
    }
    return (
        <Form layout="horizontal">
            {/* <p>{statusCode}</p> */}
            <p> {message}</p>
            <Form.Group>
                <InputGroup>
                    <InputGroup.Addon>
                        <EmailFillIcon />
                    </InputGroup.Addon>
                    <Form.Control name='Email' placeholder="Email Address" onChange={(e) => { setUsername(e); }} />
                </InputGroup>
            </Form.Group>

            <Form.Group>
                <InputGroup>
                    <InputGroup.Addon>
                        <RiLockPasswordFill />
                    </InputGroup.Addon>
                    <Form.Control name='Password' type={visible ? 'text' : 'password'} placeholder="Password" autoComplete="off" onChange={(e) => { setPassword(e) }} />
                    {/* <InputGroup.Button onClick={() => setVisible(!visible)}>
                        {visible ? <EyeIcon /> : <EyeSlashIcon />}
                    </InputGroup.Button> */}
                </InputGroup>
            </Form.Group>
            <FlexboxGrid justify="center">
                <IconButton onClick={() => login()} loading={loginLoad} icon={<ArrowRightLineIcon />} circle size="lg" />
            </FlexboxGrid>
        </Form>
    )
}