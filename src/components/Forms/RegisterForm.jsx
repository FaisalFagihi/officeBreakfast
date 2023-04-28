import { useState } from 'react';
import axiosInstance from "../../interceptors/axiosInstance"
import { Form, Button, Schema, Row, Col, FlexboxGrid, IconButton, Divider } from "rsuite"
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import auth from '../../modules/auth';
import { useNavigate } from 'react-router-dom';

export function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [message, setMessage] = useState("");
    const [registerLoad, setRegisterLoad] = useState(false);

    const navigate = useNavigate();

    function Register(username, password, firstName, lastName) {
        console.log(username, password)
        const data = {
            "Username": username,
            "Password": password,
            "FirstName": firstName,
            "LastName": lastName,
        }

        console.log(data);

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
                console.log("ss", response?.response?.data)
                setMessage(response?.response?.data);
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
        <Form fluid layout='vertical'>
            <div>
                {message}
            </div>
            <Divider className='my-3' />
            <Form.Group controlId="email" >
                <Form.Control placeholder='Email' name="email" onChange={(e) => setUsername(e)} />
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col xs={12}>
                        <Form.Group controlId="firstName">
                            <Form.Control placeholder='First Name' name="firstName" onChange={(e) => { setFirstName(e) }} />
                        </Form.Group>
                    </Col>
                    <Col xs={12}>
                        <Form.Group controlId="lastName">
                            <Form.Control placeholder='Last Name' name="lastName" onChange={(e) => { setLastName(e) }} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Control placeholder='Password' name="password" type="password" autoComplete="off" onChange={(e) => { setPassword(e) }} />
            </Form.Group>
            <Form.Group>
                <FlexboxGrid justify="center">
                    <IconButton onClick={() => Register(username, password, firstName, lastName)} loading={registerLoad} icon={<ArrowRightLineIcon />} circle size="lg" />
                </FlexboxGrid>
            </Form.Group>
        </Form>
    );
}