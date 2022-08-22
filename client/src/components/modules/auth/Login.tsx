import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { AuthContext } from '../../../contexts/auth/AuthContext';
import { authenticate } from './auth.service';
//import './login.css'
import logo from '../../../assets/logo.png'
import { SocketContext } from 'src/contexts/socket/SocketContext';

const Login = () => {
    const { login } = useContext(AuthContext)
    const { connect } = useContext(SocketContext)
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const { email, password } = loginInfo;

    const onChange = (e: any) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value })
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        authenticate(loginInfo).then(
            res => {
                login(res.data)
                const user_roles = res.data.roles.map((elem: any) => elem.label)
                connect(res.data._id, user_roles)
                navigate('/')
            },
            error => {
                console.log("ERROR", error.response.data.msg);
            }
        )
    }
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto flex flex-col items-center">
                <img src={logo} className="w-32 text-center" />
                <div className="text-3xl font-bold text-gray-800 text-center">
                    Gym Park
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
                            Mot de passe
                        </label>
                        <input type="password" name="password" onChange={onChange} value={password}
                            className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <a href="#" className="font-medium text-sm text-primary-500">
                                Mot de passe oublié ?
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
