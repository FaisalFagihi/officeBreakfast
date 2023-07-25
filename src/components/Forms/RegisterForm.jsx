import { createRef, useState } from 'react';
import axiosInstance from "../../interceptors/axiosInstance"
import { Form, Button, Schema, Row, Col, FlexboxGrid, IconButton, Divider, Loader } from "rsuite"
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import auth from '../../modules/auth';
import { useNavigate } from 'react-router-dom';

export function RegisterForm() {
    const username = createRef();
    const password = createRef();
    const firstName = createRef();
    const lastName = createRef();
    const [message, setMessage] = useState("");
    const [registerLoad, setRegisterLoad] = useState(false);

    const navigate = useNavigate();

    function Register(username, password, firstName, lastName) {
        setMessage("Registering..")
        const data = {
            "Username": username,
            "Password": password,
            "FirstName": firstName,
            "LastName": lastName,
        }
        setRegisterLoad(true);
        axiosInstance.post("register", data)
            .then(async (response) => {
                if (response?.status === 200) {
                    auth.setToken(response.data['token'])
                    await localStorage.setItem('username', response.data['username'])
                    await localStorage.setItem('firstName', response.data['firstName'])
                    await localStorage.setItem('lastName', response.data['lastName'])
                    setMessage(response.data['message'])
                    
                    navigate("/")
                }
            }).catch(function (response) {

                if (response?.response?.status === 401) {
                    setMessage(response.response.data)
                    return;
                }

                response?.response?.data ? setMessage(response.response.data) : setMessage(response.message)
            }).finally(() => setRegisterLoad(false));
    }


    const usernameRule = Schema.Types.StringType().isRequired();
    const emailRule = Schema.Types.StringType().isRequired().isEmail('Please enter a valid email address.');
    // const phoneRule = Schema.Types.StringType().isRequired().is('Please enter a valid phone number.');
    const passwordRule = Schema.Types.StringType().isRequired();
    const verifyPasswordRule = Schema.Types.StringType()
        .addRule((value, data) => {
            console.log(data);

            if (value !== data.password) {
                return false;
            }

            return true;
        }, 'The two passwords do not match')
        .isRequired('This field is required.')

    return (
        <div className="px-0">
            <div hidden={!message} className="p-2 text-sm text-center">
                {message}
            </div>
            <div hidden={message} className="text-sm text-center">
                Fill the fields with the required information:
            </div>
            <input className='input rounded-full mt-3' placeholder='Email' ref={username} />
            <div className="grid grid-cols-2 mt-3">
                <input className='input rounded-full rounded-r-none' placeholder='First Name' name="firstName" ref={firstName} />
                <input className='input rounded-full rounded-l-none' placeholder='Last Name' name="lastName" ref={lastName} />
            </div>
            <input className='input mt-3 rounded-full' placeholder='Password' name="password" type="password" autoComplete="off" ref={password} />
            <button onClick={() => Register(username.current.value, password.current.value, firstName.current.value, lastName.current.value)} className='normal m-auto mt-5 w-10 h-10 !rounded-full'>
                {registerLoad ? <Loader /> :
                    <ArrowRightLineIcon className='text-lg' />}
            </button>
        </div>
    );
}