import { LoginForm } from '../../components/Forms/LoginForm';
import { RegisterForm } from '../../components/Forms/RegisterForm';
import { Navigate, useNavigate } from "react-router-dom";
import auth from '../../modules/auth'
import { useEffect, useState } from "react"
import { Panel } from "../../style/Style"


export default function LoginPage() {
    const form = { login: "Login", signUp: "Sign Up" }
    const [active, setActive] = useState(form.login);
    let navigate = useNavigate();


    return (
        auth.isAuthenticated() ?
            <Navigate to="/" /> :
            <div className="w-screen h-screen">
                <Panel className="m-auto w-[350px] sm:w-[470px] bg-white rounded-full !px-10 !pt-0 h-[420px] sm:h-[470px] border-0 shadow-sm mt-20 sm:mt-56">
          

                    <img src='https://i.ibb.co/p35mmxd/logo.png' className='m-auto h-[70px] sm:h-[110px]' draggable="false" />
                    <div hidden={active !== form.login}>

                        {/* <Divider> or </Divider> */}
                        <LoginForm />
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
