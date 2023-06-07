import { useState, useEffect, useRef } from 'react';
import auth from '../../modules/auth'
import { useNavigate } from 'react-router-dom';
import { Divider, Loader } from 'rsuite';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';

import { BsGoogle } from 'react-icons/bs';

import '../../App.scss'
import userController from '../../controller/userController';

export function LoginForm({ googleLogin }) {
    const email = useRef();
    const password = useRef();
    const [message, setMessage] = useState("Use email and password");
    const [loginLoad, setLoginLoad] = useState(false);
    const [isResetPassword, setResetPassword] = useState(false);
    const navigate = useNavigate();




    const login = async () => {
        setLoginLoad(true);
        setMessage("signing..")
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

    return (<>
        <div onClick={() => { setLoginLoad(true); googleLogin() }} className="flex border rounded-full m-auto cursor-pointer p-1.5 w-fit z-10 hover:text-mainOrange"  >
            <BsGoogle size={20} />
            <div className="my-auto ml-2 !text-black">
                Sign in with google
            </div>
        </div>

        <Divider className="!my-4">or</Divider>
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
                <button onClick={() => login()} className="m-auto mt-5 normal w-10 h-10 !rounded-full" >
                    {loginLoad ? <Loader /> :
                        <ArrowRightLineIcon className='text-lg' />}
                </button>
            </div>
            : <div>
                <input placeholder="Email" className='input !rounded-full mt-3' ref={email} />
                <button onClick={() => resetPassword(email)}>Reset</button>
            </div>}
    </>
    )
}