import React, { useEffect, useState } from 'react'
import auth from '../../modules/auth';
import { useParams } from 'react-router-dom';
import userController from '../../controller/userController';
import Fatch from '../../Helpers/Fatcher';

export default function EmailConfirmation() {
    const { token } = useParams();
    const [response, setResponse] = useState(null);
    const [isSucessed, setSuccessStatus] = useState();

    useEffect(() => {
        if (response?.status === 200) {
            auth.setToken(response.data['token'])
            localStorage.setItem('username', response.data['username'])
            localStorage.setItem('firstName', response.data['firstName'])
            localStorage.setItem('lastName', response.data['lastName'])
            setSuccessStatus(true)
            window.location.reload()
            return;
        }

    }, [response])


    return (
        <div className='flex flex-col text-center justify-center mt-32'>
            {isSucessed?
                <>
                    <div className='font-bold'>Registeration Successed</div>
                    <div>you will be redirected to the home page..</div>
                </>:<></>
           }
            <Fatch request={() => userController.confirmEmail(token)} setData={setResponse} />
        </div>
    )
}
