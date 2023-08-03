import { useState, useEffect, useRef } from 'react';
import auth from '../../modules/auth'
import { useNavigate } from 'react-router-dom';
import { Divider, Loader } from 'rsuite';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import { GoogleLogin, useGoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script"

import { BsGoogle } from 'react-icons/bs';

import '../../App.scss'
import userController from '../../controller/userController';

export function LoginForm({ googleLogin }) {
    const email = useRef();
    const password = useRef();
    const [message, setMessage] = useState("Use email and password");
    const [loginLoad, setLoginLoad] = useState(false);
    const [googleLoginLoad, setGoogleLoginLoad] = useState(false);
    const [isResetPassword, setResetPassword] = useState(false);

    const navigate = useNavigate();

    const login = async () => {
        setLoginLoad(true);
        setMessage("Signing in..")
        auth.login(email.current.value, password.current.value).then(async (response) => {
            if (response?.status === 200) {
                auth.setToken(response.data['token'])
                await localStorage.setItem('username', response.data['username'])
                await localStorage.setItem('firstName', response.data['firstName'])
                await localStorage.setItem('lastName', response.data['lastName'])
                setMessage(response.data['message'])
                navigate("/")
            }
        }).catch((response) => {
            console.log(response)
            if (response?.response?.status === 401) {
                setMessage(response.response.data)
                return
            }
            response?.response?.data ? setMessage(response.response.data) : setMessage(response.message)
        }).finally(() => setLoginLoad(false));
    }

    const resetPassword = () => {
        userController.resetPassword(email.current.value).then(async (response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
            if (response?.response?.status === 401) {
                setMessage(response.response.data)
                return
            }
            response?.response?.data ? setMessage(response.response.data) : setMessage(response.message)
        })
    }

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
        clientId: clientID,
        onSuccess: credentialResponse => {
            auth.loginByGoogleAuth(credentialResponse.tokenId).then(async (response) => {
                if (response?.status === 200) {
                    auth.setToken(response.data['token'])
                    localStorage.setItem('username', response.data['username'])
                    localStorage.setItem('firstName', response.data['firstName'])
                    localStorage.setItem('lastName', response.data['lastName'])
                    localStorage.setItem('picture', response.data['picture'])
                    navigate("/")
                }
            }).catch((response) => {
            }).finally(() => { setGoogleLoginLoad(false) });
        },
        onFailure: (e) => {
            console.log(e)
            setGoogleLoginLoad(false)
        },
    })

    return (
        <>
            <div onClick={loaded ? () => { setGoogleLoginLoad(true); signIn() } : () => { }} className={`flex border rounded-full m-auto cursor-pointer p-1.5 w-fit z-10 hover:text-black ${!loaded ? 'bg-mainGray text-white hover:!text-white' : ''}`}  >
                <BsGoogle size={22} />
                <div className="my-auto w-32 flex">
                    {googleLoginLoad ? <Loader size='xs' content={'Signing In..'} className='m-auto' /> : <div className='m-auto'>Sign in with google </div>}
                </div>
            </div>
            <Divider className="!my-6 sm:!my-4">or</Divider>
            {/* <p>{statusCode}</p> */}

            {!isResetPassword ?

                <div>
                    <p className="p-1 text-sm text-center" hidden={!message}> {message}</p>
                    <input placeholder="Email" className='input !rounded-full mt-3' ref={email} />
                    <div className="mt-3" >
                        <input type={'password'} placeholder="Password" className='input !rounded-full' ref={password} />

                        <div className="mt-1 w-full">
                            <a className='text-sm font-normal text-[#777] cursor-pointer p-1 pl-3' onClick={() => setResetPassword(true)}> forgot password ?</a>
                        </div>
                    </div>
                    <button onClick={() => login()} className="m-auto mt-0 normal w-10 h-10 !rounded-full" >
                        {loginLoad ? <Loader size='xs' /> : <ArrowRightLineIcon className='text-lg' />}
                    </button>
                </div>
                : <div>
                    <input placeholder="Email" className='input !rounded-full mt-3' ref={email} />
                    <button onClick={() => resetPassword(email)}>Reset</button>
                </div>}
        </>
    )
}