import React, { useEffect, useState } from 'react'
import auth from '../../modules/auth';
import { useNavigate, useParams } from 'react-router-dom';
import userController from '../../controller/userController';
import Fatch from '../../Helpers/Fatcher';

export default function EmailConfirmation() {
    const { token } = useParams();
    const [response, setResponse] = useState(null);
    const [isSucessed, setSuccessStatus] = useState();
    const [requestError, setRequestError] = useState();
    const navigate = useNavigate()
    
    useEffect(() => {
        if (response?.status) {
            auth.setToken(response.token)
            localStorage.setItem('username', response.username)
            localStorage.setItem('firstName', response.firstName)
            localStorage.setItem('lastName', response.lastName)
            localStorage.setItem('picture', response.picture)
            setSuccessStatus(true)
            navigate('../')
            return;
        }

    }, [response])

    useEffect(() => {

    }, [requestError]);
    
    useEffect(() => {
        
    
    }, [token]);
    return (
        <div className='flex flex-col text-center justify-center mt-32'>
            {isSucessed ?
                <>
                    <div className='font-bold'>Registeration Successed</div>
                    <div>you will be redirected to the home page..</div>
                </> : <div>{
                    requestError ?
                        requestError.message :
                        'Confriming Email..'
                }
                </div>

            }
            <Fatch request={() => userController.confirmEmail(token)} setError={setRequestError} setData={setResponse} />
        </div >
    )
}
