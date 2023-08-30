import React, { useRef, useState } from 'react'
import { Panel } from '../../style/Style';
import { useNavigate } from 'react-router-dom';
import auth from '../../modules/auth';
import userController from '../../controller/userController';
import { Loader } from 'rsuite';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';

export default function ForgotPasswordPage() {
    const email = useRef();
    const navigate = useNavigate()
    const [message, setMessage] = useState('Insert your registerd email.');
    const [resetPasswordLoad, setResetPasswordLoad] = useState(false);

    const resetPassword = () => {
        setMessage('Checking email..')
        setResetPasswordLoad(true)
        userController.resetPassword(email.current.value).then(async ({ data }) => {
            setMessage(data)
        }).catch((err) => {
            if (err?.response?.data) {
                setMessage(err?.response?.data)
            }
        }).finally(() => {
            setResetPasswordLoad(false)
        })
    }
    return (
        auth.isAuthenticated() ?
            <Navigate to="/" /> :
            <div className='sm:my-12 sm:flex sm:justify-center'>

                <div className={'shadow-sm px-10 py-2 bg-white sm:rounded-full h-screen sm:h-[350px] sm:w-[350px]'}>
                    <div className='flex flex-col'>
                        <div className='p-1'>
                            <img src='/assets/logo_512.png' className='m-auto mt-4 h-[100px] sm:h-[80px] ' draggable={false} />
                        </div>
                        <label className='text-lg text-center mb-1' >
                            Forgot Password
                        </label>
                        <div className='h-8 text-center grid align-middle' >
                            <label className='px-2 text-sm  m-auto'>
                                {message}
                            </label>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <input placeholder="Email" className='input !rounded-full mt-3' ref={email} />
                                {/* <button onClick={() => className='normal w-full !rounded-full'>Reset</button> */}
                                <button onClick={() => resetPassword(email)} className="m-auto mt-0 normal w-10 h-10 !rounded-full" >
                                    {resetPasswordLoad ? <Loader size='xs' /> : <ArrowRightLineIcon className='text-lg' />}
                                </button>

                            <p className="text-center p-2 text-base"><b className='cursor-pointer' onClick={() => navigate('../')}>Login ?</b></p>
                        </div>
                    </div>
                </div>
            </div>
    )
}
