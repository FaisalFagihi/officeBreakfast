import { useState, useEffect, useRef } from 'react';
import auth from '../../modules/auth'
import { useNavigate } from 'react-router-dom';
import { Form, InputGroup, Input, IconButton, FlexboxGrid, Button, Divider } from 'rsuite';
import EmailFillIcon from '@rsuite/icons/EmailFill';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { useDispatch } from 'react-redux'
import { RiLockPasswordFill } from 'react-icons/ri';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import { GoogleLogin, useGoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script"
import { BsGoogle } from 'react-icons/bs';

import '../../App.scss'

export function LoginForm() {
    const username = useRef();
    const password = useRef();
    const [message, setMessage] = useState("");
    const [loginLoad, setLoginLoad] = useState(false);

    const navigate = useNavigate();

    const clientID = "727515938547-5knpt0voai55equqiu8okhaaoh2h26du.apps.googleusercontent.com"
    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: clientID,
                scope: ""
            })
        }

        gapi.load('client:auth2', start)
    }, []);

    const { signIn, loaded } = useGoogleLogin({
        onSuccess: credentialResponse => {
            console.log(credentialResponse);
            auth.loginByGoogleAuth(credentialResponse.tokenId).then(async (response) => {
                console.log("sff", response)
                if (response?.status === 200) {
                    auth.setToken(response.data['token'])
                    await localStorage.setItem('username', response.data['username'])
                    await localStorage.setItem('firstName', response.data['firstName'])
                    await localStorage.setItem('lastName', response.data['lastName'])
                    navigate("/")
                }
            }).catch((response) => {
                console.log("ss", response)
                console.log("ss", response?.response?.data)
            }).finally(() => { });
        },
        onFailure: (e) => {
            console.log('Login Failed', e);
        },
        clientId: clientID,
    })


    const login = async () => {
        setLoginLoad(true);
        auth.login(username.current.value, password.current.value).then(async (response) => {
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
        <>
            <div  onClick={() => signIn()} className="flex border rounded-full m-auto cursor-pointer p-1.5 w-fit z-10 hover:text-mainOrange">
                    <BsGoogle size={20} />
                <div className="my-auto ml-2 !text-black">
                    Sign in with google
                </div>
            </div>

            <Divider className="!my-4">or</Divider>
            {/* <p>{statusCode}</p> */}
            <p className="p-1 text-sm text-center" hidden={!message}> {message}</p>
            <input placeholder="Email" className='input !rounded-full mt-3' ref={username} />
            <div className="mt-3" >
                <input type={'password'} placeholder="Password" className='input !rounded-full' ref={password} />

                <div className="mt-1 w-full">
                    <a className='text-sm font-normal text-[#777] cursor-pointer p-1 pl-3'> forgot password ?</a>
                </div>
            </div>
            <button onClick={() => login()} className="m-auto mt-5 normal w-10 h-10 !rounded-full" ><ArrowRightLineIcon className='text-lg' /></button>
        </>
    )
}