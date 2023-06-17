import { LoginForm } from '../../components/Forms/LoginForm';
import { RegisterForm } from '../../components/Forms/RegisterForm';
import { Navigate, useNavigate } from "react-router-dom";
import auth from '../../modules/auth'
import { useEffect, useState } from "react"
import { Panel } from "../../style/Style"
import { GoogleLogin, useGoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script"

export default function LoginPage() {
    const form = { login: "Login", signUp: "Sign Up" }
    const [active, setActive] = useState(form.login);
    let navigate = useNavigate();

    
    const clientID = "727515938547-5knpt0voai55equqiu8okhaaoh2h26du.apps.googleusercontent.com"
    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: clientID,
                scope: ""
            })
        }

        gapi.load('client:auth2', start)

        console.log("VITE_API_URL", 'import.meta\u200b.env.VITE_API_URL')
    }, []);

    const { signIn, loaded } = useGoogleLogin({
        clientId: clientID,
        onSuccess: credentialResponse => {
            console.log(credentialResponse);
            auth.loginByGoogleAuth(credentialResponse.tokenId).then(async (response) => {
                console.log("sff", response)
                if (response?.status === 200) {
                    auth.setToken(response.data['token'])
                     localStorage.setItem('username', response.data['username'])
                     localStorage.setItem('firstName', response.data['firstName'])
                     localStorage.setItem('lastName', response.data['lastName'])
                    navigate("/")
                }
            }).catch((response) => {
                console.log("ss", response)
                console.log("ss", response?.response?.data)
            }).finally(() => { setLoginLoad(false) });
        },
        onFailure: (e) => {
            console.log('Login Failed', e);
        },
    })

     return loaded && (
        auth.isAuthenticated() ?
            <Navigate to="/" /> :
            <div className="w-screen h-screen">
                <Panel className="m-auto w-[350px] sm:w-[470px] bg-white rounded-full !px-10 !pt-0 h-[420px] sm:h-[470px] border-0 shadow-sm mt-20 sm:mt-56">
          

                    <img src='https://i.ibb.co/p35mmxd/logo.png' className='m-auto h-[70px] sm:h-[110px]' draggable="false" />
                    <div hidden={active !== form.login}>

                        {/* <Divider> or </Divider> */}
                        <LoginForm googleLogin={signIn} />
                        <p className="text-center p-2"><b style={{ cursor: "pointer" }} onClick={() => setActive(form.signUp)}>Sign up</b></p>
                    </div>
                    <div hidden={active !== form.signUp}>

                        <RegisterForm />
                        <p className="text-center p-2"><b style={{ cursor: "pointer" }} onClick={() => setActive(form.login)}>Login</b></p>
                    </div>


                </Panel>
            </div>
    )
}
