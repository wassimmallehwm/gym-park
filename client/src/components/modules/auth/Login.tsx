import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/auth/AuthContext';
import { authenticate } from './auth.service';
//import './login.css'
import logo from '../../../assets/logo.png'
import { SocketContext } from 'src/contexts/socket/SocketContext';
import { Button } from '../../../shared/components';

const Login = () => {
    const { login } = useContext(AuthContext)
    const { connect } = useContext(SocketContext)
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [rolesModal, setRolesModal] = useState(false)
    const [rolesList, setRolesList] = useState([])
    const [loginResp, setLoginResp] = useState<any>()

    const { email, password } = loginInfo;

    const onChange = (e: any) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value })
    }

    const onLogin = (data: any) => {
        login(data)
        const user_roles = data.roles.map((elem: any) => elem.label)
        connect(data._id, user_roles)
        navigate('/')
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        authenticate(loginInfo).then(
            res => {
                if (res.data.roles.length > 1) {
                    setRolesModal(true)
                    setRolesList(res.data.roles)
                    setLoginResp(res.data)
                } else {
                    onLogin(res.data)
                }
            },
            error => {
                console.log("ERROR", error.response.data.msg);
            }
        )
    }

    const continueAs = (id: string) => {
        let loginData = loginResp
        loginData.roles = [rolesList.find((elem: any) => elem._id == id)]
        setRolesModal(false)
        setRolesList([])
        setLoginResp(null)
        onLogin(loginData)
    }

    const _rolesModal = rolesModal && (
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80'>
            <div className='bg-slate-100 p-16 rounded-sm'>
            <div className='text-xl text-center text-gray-600 my-8 mx-auto'>
                Continue as :
            </div>
            <div className='flex items-center gap-4'>
                {
                    rolesList.map((role: any) => (
                        <Button color='primary' outline onClick={() => continueAs(role._id)}>
                            {role.label}
                        </Button>
                    ))
                }
            </div>
            </div>
        </div>
    )
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col justify-center">
            {_rolesModal}
            <div className="max-w-md w-full mx-auto flex flex-col items-center">
                <img src={logo} className="w-32 text-center" />
                <div className="text-3xl font-bold text-gray-800 text-center">
                    Gym Park | Login
                </div>
            </div>
            <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
                <form action="" className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">
                            Email
                        </label>
                        <input type="email" name="email" onChange={onChange} value={email}
                            className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">
                            Password
                        </label>
                        <input type="password" name="password" onChange={onChange} value={password}
                            className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <div>
                            <button type="button" onClick={() => navigate('/signup')} className="font-medium text-sm text-primary-500">
                                No account ? Join us !
                            </button>
                        </div>
                        <div>
                            <a href="#" className="font-medium text-sm text-primary-500">
                                Forgot password ?
                            </a>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 
                        rounded-md text-white text-sm">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
