import { LoginForm } from '../../components/Forms/LoginForm';
import { RegisterForm } from '../../components/Forms/RegisterForm';
import { Navigate, useNavigate } from "react-router-dom";
import auth from '../../modules/auth'
import { useEffect, useState } from "react"
import { Panel } from "../../style/Style"

export default function LoginPage() {
    const form = { login: "Login", signUp: "Sign Up" }
    const [active, setActive] = useState(form.login);

    return (
        auth.isAuthenticated() ?
            <Navigate to="/" /> :
            <div className='sm:flex justify-center'>

                <div className=" h-screen p-10 sm:w-[450px] sm:h-[450px] bg-white sm:rounded-full sm:!px-14 sm:!pt-0  sm:border-0 sm:shadow-sm sm:my-36">
                    <div className='p-1'>

                        <img src='/assets/logo_512.png' className='m-auto mt-4 h-[100px] sm:h-[80px] ' draggable="false" />
                    </div>

                    <div hidden={active !== form.login}>
                        {/* <Divider> or </Divider> */}
                        <div className='h-96 sm:h-auto'>

                            <LoginForm />
                        </div>

                        <p className="text-center p-2">don't have account? <b style={{ cursor: "pointer" }} onClick={() => setActive(form.signUp)}>Register</b></p>
                    </div>
                    <div hidden={active !== form.signUp} className='pt-1'>
                        <div className='h-96 sm:h-auto'>
                            <RegisterForm />
                        </div>
                        <p className="text-center p-2 mt-2">already have account? <b style={{ cursor: "pointer" }} onClick={() => setActive(form.login)}>Login</b></p>
                    </div>
                </div>
            </div>
    )
}
