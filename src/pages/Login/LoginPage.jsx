import { LoginForm } from '../../components/Forms/LoginForm';
import { RegisterForm } from '../../components/Forms/RegisterForm';
import { Navigate, useNavigate } from "react-router-dom";
import auth from '../../modules/auth'
import { Navbar, FlexboxGrid, Container, Header, Footer, Content, Nav, Panel, Col, Grid, Row } from 'rsuite';
import { useState } from "react"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';


export default function LoginPage() {
    const form = { login: "Login", signUp: "Sign Up" }
    const [active, setActive] = useState(form.login);
    let navigate = useNavigate();

    return (
        auth.isAuthenticated() ?
            <Navigate to="/" /> :
            <div>
                <Grid>
                    <Row>
                        <Col xs={24}>
                            <Panel className='w-full' bordered header={<h4>{active}</h4>} >
                                <div hidden={active !== form.login}>
                                    <LoginForm />
                                    <br />
                                    <p>Don't have an account? <b style={{ cursor: "pointer" }} onClick={() => setActive(form.signUp)}>Sign up</b></p>
                                </div>
                                <div hidden={active !== form.signUp}>

                                    <RegisterForm />
                                    <br />
                                    <p>Already have an account? <b style={{ cursor: "pointer" }} onClick={() => setActive(form.login)}>Login</b></p>
                                </div>

                                <GoogleLogin
                                    theme='outline'
                                    type='icon'
                                    text='continue_with'
                                    shape="pill"
                                    onSuccess={credentialResponse => {
                                        console.log(credentialResponse);
                                        auth.loginByGoogleAuth(credentialResponse.credential).then(async (response) => {
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
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />
                            </Panel>
                        </Col>
                    </Row>
                    <Row>

                        <Col xs={24}>
                            <Footer>Breakfast Group @copyrights  </Footer>
                        </Col>
                    </Row>


                </Grid>
            </div>
    )
}
