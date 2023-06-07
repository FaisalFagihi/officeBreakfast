import React, { useEffect, useRef } from 'react'
import userController from '../../controller/userController'
import { useParams } from 'react-router-dom'

export const ResetPasswordPage = () => {
  const password = useRef()
  const {resetToken} = useParams()
useEffect(() => {

  console.log(resetToken)
}, []);
 const updatePassword=()=>{
  userController.updatePassword(password.current.value, resetToken).then(async (response)=>{

  }).catch(response=>{
console.log(response)    
  })
 }
  return (
    <div>
      <input type={'password'} placeholder="Password" className='input !rounded-full' ref={password} />
      <button onClick={()=>updatePassword()}>Update</button>
    </div>
  )
}
