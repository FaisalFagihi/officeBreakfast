import React, { useEffect, useRef, useState } from 'react'
import userController from '../../controller/userController'
import { Navigate, useParams } from 'react-router-dom'
import auth from '../../modules/auth'
import { Loader } from 'rsuite'
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';

export const ResetPasswordPage = () => {
  const [message, setMessage] = useState('Insert new password');
  const [resetPasswordLoad, setResetPasswordLoad] = useState(false);
  const password = useRef()
  const { resetToken } = useParams()

  useEffect(() => {

  }, []);
  const updatePassword = () => {
    setMessage('Updating password..')
    setResetPasswordLoad(true)
    userController.updatePassword(password.current.value, resetToken).then(async ({data}) => {
      setMessage(data?.message)
      auth.setToken(data?.token)
      localStorage.setItem('username', data?.username)
      localStorage.setItem('firstName', data?.firstName)
      localStorage.setItem('lastName', data?.lastName)
      localStorage.setItem('picture', data?.picture)
      navigate('../')
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
              Update Password
            </label>
            <div className='h-8 text-center grid align-middle' >
              <label className='px-2 text-sm  m-auto'>
                {message}
              </label>
            </div>
            <div className='flex flex-col gap-3'>
              {/* <input type={'password'} placeholder="Password" className='input !rounded-full' ref={password} />
      <button onClick={()=>updatePassword()}>Update</button> */}

              <input type='password' placeholder="Password" className='input !rounded-full mt-3' ref={password} />
              <div>
                {/* <button onClick={() => className='normal w-full !rounded-full'>Reset</button> */}
                <button onClick={() => updatePassword()} className="m-auto mt-0 normal w-10 h-10 !rounded-full" >
                  {resetPasswordLoad ? <Loader size='xs' /> : <ArrowRightLineIcon className='text-lg' />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
